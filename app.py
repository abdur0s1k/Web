from flask import Flask, request, jsonify, render_template, session, redirect, url_for, send_from_directory

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import text
from datetime import datetime
import logging
import traceback
import os

app = Flask(__name__)

# Настройки подключения к базе данных PostgreSQL
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql+psycopg2://postgres:vlat2014@localhost:5432/my_project'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.secret_key = 'your_secret_key'
UPLOAD_FOLDER = 'static/icon_users'  # Папка для загрузки
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Логирование
logging.basicConfig(level=logging.DEBUG)

db = SQLAlchemy(app)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/')
def home():
    try:
        user = None
        if 'user_id' in session:
            user_query = text("SELECT id, name, email FROM users WHERE id = :user_id")
            user = db.session.execute(user_query, {'user_id': session['user_id']}).mappings().fetchone()
        return render_template('index.html', user=user)
    except Exception as e:
        app.logger.error(f"Ошибка на главной странице: {e}\n{traceback.format_exc()}")
        return jsonify({'error': 'Ошибка загрузки главной страницы'}), 500
    
@app.route('/catalog')
def catalog():
    return render_template('catalog.html')

@app.route('/checkout', methods=['GET'])
def checkout_view():
    return render_template('checkout.html')

@app.route('/devices', methods=['GET'])
def devices():
    return render_template('devices.html')

@app.route('/services', methods=['GET'])
def services():
    return render_template('services.html')
    
@app.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'Некорректные данные'}), 400

        name = data.get('name')
        email = data.get('email')
        password = data.get('password')

        if not all([name, email, password]):
            return jsonify({'error': 'Все поля обязательны'}), 400

        check_query = text("SELECT * FROM users WHERE email = :email")
        result = db.session.execute(check_query, {'email': email}).fetchone()
        if result:
            return jsonify({'error': 'Пользователь с таким email уже существует'}), 400

        insert_query = text("""
            INSERT INTO users (name, email, password) 
            VALUES (:name, :email, :password)
        """)
        db.session.execute(insert_query, {'name': name, 'email': email, 'password': password})
        db.session.commit()

        return jsonify({'message': 'Регистрация успешна'}), 201
    except Exception as e:
        app.logger.error(f"Ошибка регистрации: {e}\n{traceback.format_exc()}")
        return jsonify({'error': 'Ошибка сервера'}), 500

@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'Некорректные данные'}), 400

        email = data.get('email')
        password = data.get('password')

        if not all([email, password]):
            return jsonify({'error': 'Все поля обязательны'}), 400

        select_query = text("SELECT id, name, password FROM users WHERE email = :email")
        user = db.session.execute(select_query, {'email': email}).fetchone()

        if user and user[2] == password:  # Прямая проверка пароля (user[2] — это password)
            session['user_id'] = user[0]  # user[0] — это id
            return jsonify({'message': 'Вход выполнен успешно', 'user': {'name': user[1], 'email': email}}), 200
        else:
            return jsonify({'error': 'Неверный email или пароль'}), 401
    except Exception as e:
        app.logger.error(f"Ошибка входа: {e}\n{traceback.format_exc()}")
        return jsonify({'error': 'Ошибка сервера'}), 500

@app.route('/logout', methods=['POST'])
def logout():
    try:
        session.pop('user_id', None)
        return jsonify({'message': 'Вы успешно вышли из системы'}), 200
    except Exception as e:
        app.logger.error(f"Ошибка выхода: {e}\n{traceback.format_exc()}")
        return jsonify({'error': 'Ошибка сервера'}), 500

@app.route('/get_users', methods=['GET'])
def get_users():
    if "user_id" not in session:
        return jsonify({"error": "Пользователь не авторизован"}), 401

    try:
        user_query = text("""
            SELECT id, name, email, profile_photo 
            FROM users WHERE id = :user_id
        """)
        user = db.session.execute(user_query, {"user_id": session["user_id"]}).mappings().fetchone()

        if not user:
            return jsonify({"error": "Пользователь не найден"}), 404

        return jsonify({
            "id": user["id"],
            "name": user["name"],
            "email": user["email"],
            "profile_photo": user["profile_photo"] or "/static/icon_users/default.png"
        }), 200
    except Exception as e:
        app.logger.error(f"Ошибка получения профиля: {e}")
        return jsonify({"error": "Ошибка сервера"}), 500



@app.route("/update_profile_photo", methods=["POST"])
def update_profile_photo():
    if "user_id" not in session:
        return jsonify({"error": "User not authenticated"}), 401

    if "profile_photo" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["profile_photo"]
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    if not allowed_file(file.filename):
        return jsonify({"error": "Invalid file type"}), 400

    # Генерация уникального имени файла
    filename = f"user_{session['user_id']}_{file.filename}"
    file_path = os.path.join(app.config["UPLOAD_FOLDER"], filename)
    relative_path = f"static/icon_users/{filename}"  # Путь, который сохранится в базе данных

    try:
        # Проверяем, существует ли папка для загрузок
        os.makedirs(app.config["UPLOAD_FOLDER"], exist_ok=True)

        # Сохраняем файл
        file.save(file_path)

        # Обновляем путь в базе данных
        update_query = text("""
            UPDATE users SET profile_photo = :photo_path WHERE id = :user_id
        """)
        db.session.execute(update_query, {"photo_path": relative_path, "user_id": session["user_id"]})
        db.session.commit()

        # Возвращаем путь для клиента
        return jsonify({"new_photo_url": f"/{relative_path}"}), 200
    except Exception as e:
        app.logger.error(f"Ошибка обновления фото профиля: {e}")
        return jsonify({"error": "Failed to update profile photo"}), 500


@app.route("/icon_users/<path:filename>")
def serve_user_icon(filename):
    try:
        return send_from_directory(app.config["UPLOAD_FOLDER"], filename)
    except FileNotFoundError:
        app.logger.error(f"Файл {filename} не найден")
        return jsonify({"error": "File not found"}), 404



@app.route('/like', methods=['POST', 'DELETE'])
def handle_likes():
    if 'user_id' not in session:
        return jsonify({'error': 'Unauthorized'}), 401

    user_id = session['user_id']
    data = request.get_json()
    product_id = data.get('product_id')
    product_name = data.get('product_name')

    if not product_id:
        return jsonify({'error': 'Product ID is required'}), 400

    if request.method == 'POST':
        insert_query = text("""
            INSERT INTO likes (user_id, product_id, product_name)
            VALUES (:user_id, :product_id, :product_name)
            ON CONFLICT (user_id, product_id) DO NOTHING
        """)
        db.session.execute(insert_query, {'user_id': user_id, 'product_id': product_id, 'product_name': product_name})
        db.session.commit()
        return jsonify({'message': 'Liked'}), 200

    elif request.method == 'DELETE':
        delete_query = text("""
            DELETE FROM likes WHERE user_id = :user_id AND product_id = :product_id
        """)
        db.session.execute(delete_query, {'user_id': user_id, 'product_id': product_id})
        db.session.commit()
        return jsonify({'message': 'Unliked'}), 200

@app.route('/get_likes', methods=['GET'])
def get_likes():
    try:
        if 'user_id' not in session:
            app.logger.debug("Пользователь не авторизован")
            return jsonify({'liked_products': []}), 200

        user_id = session['user_id']
        app.logger.debug(f"Получение лайков для user_id: {user_id}")

        likes_query = text("SELECT product_id, product_name FROM likes WHERE user_id = :user_id")
        result = db.session.execute(likes_query, {'user_id': user_id}).mappings().all()

        liked_products = [{'product_id': row['product_id'], 'product_name': row['product_name']} for row in result]
        app.logger.debug(f"Лайки из базы данных: {liked_products}")

        return jsonify({'liked_products': liked_products}), 200
    except Exception as e:
        app.logger.error(f"Ошибка получения лайков: {e}\n{traceback.format_exc()}")
        return jsonify({'error': 'Ошибка сервера', 'details': str(e)}), 500
    

@app.route('/get_basket', methods=['GET'])
def get_basket():
    if 'user_id' not in session:
        return jsonify({'is_authenticated': False, 'basket': {}, 'basketTotal': 0.0})

    user_id = session['user_id']
    app.logger.debug(f"Получение корзины для user_id: {user_id}")

    try:
        basket_query = text("""
            SELECT product_id, product_name, product_price, image_url, quantity
            FROM basket WHERE user_id = :user_id
        """)
        result = db.session.execute(basket_query, {'user_id': user_id}).mappings().all()

        basket = {}
        basket_total = 0.0

        for item in result:
            basket[item['product_id']] = {
                'name': item['product_name'],
                'price': float(item['product_price']),
                'image': item['image_url'],
                'quantity': item['quantity']  # Включаем количество товара
            }
            basket_total += float(item['product_price']) * item['quantity']

        return jsonify({
            'is_authenticated': True,
            'basket': basket,
            'basketTotal': basket_total
        })
    except Exception as e:
        app.logger.error(f"Ошибка получения корзины: {e}\n{traceback.format_exc()}")
        return jsonify({'error': 'Ошибка сервера', 'details': str(e)}), 500



@app.route('/basket', methods=['POST'])
def add_to_basket():
    if 'user_id' not in session:
        return jsonify({'error': 'User not authenticated'}), 401

    data = request.get_json()

    user_id = session['user_id']
    product_id = data.get('product_id')
    product_name = data.get('product_name')
    product_price = data.get('product_price')
    image_url = data.get('image_url')
    quantity = data.get('quantity', 1)
    total_price = data.get('total_price')

    if not product_id or not product_name or not product_price or not image_url:
        return jsonify({'error': 'Missing required fields'}), 400

    try:
        # Проверяем, существует ли товар в корзине
        check_query = text("""
            SELECT 1 FROM basket WHERE user_id = :user_id AND product_id = :product_id
        """)
        exists = db.session.execute(check_query, {'user_id': user_id, 'product_id': product_id}).fetchone()

        if not exists:
            insert_query = text("""
                INSERT INTO basket (user_id, product_id, product_name, product_price, image_url, quantity, total_price)
                VALUES (:user_id, :product_id, :product_name, :product_price, :image_url, :quantity, :total_price)
            """)
            db.session.execute(insert_query, {
                'user_id': user_id,
                'product_id': product_id,
                'product_name': product_name,
                'product_price': product_price,
                'image_url': image_url,
                'quantity': quantity,
                'total_price': total_price
            })
            db.session.commit()

        return jsonify({'message': 'Product added to basket'}), 200
    except Exception as e:
        app.logger.error(f"Ошибка добавления товара в корзину: {e}")
        return jsonify({'error': 'Ошибка сервера', 'details': str(e)}), 500


@app.route('/update_quantity', methods=['POST'])
def update_quantity():
    if 'user_id' not in session:
        return jsonify({'error': 'User not authenticated'}), 401

    data = request.get_json()
    product_id = data.get('product_id')
    quantity = data.get('quantity')

    if not product_id or quantity is None:
        return jsonify({'error': 'Missing required fields'}), 400

    try:
        user_id = session['user_id']

        # Проверяем, есть ли товар в корзине
        query = text("""
            SELECT quantity FROM basket WHERE user_id = :user_id AND product_id = :product_id
        """)
        result = db.session.execute(query, {'user_id': user_id, 'product_id': product_id}).fetchone()

        if result:
            # Обновляем количество товара
            update_query = text("""
                UPDATE basket
                SET quantity = :quantity, total_price = product_price * :quantity
                WHERE user_id = :user_id AND product_id = :product_id
            """)
            db.session.execute(update_query, {
                'user_id': user_id,
                'product_id': product_id,
                'quantity': quantity
            })
            db.session.commit()
            return jsonify({'message': 'Quantity updated successfully'}), 200
        else:
            return jsonify({'error': 'Product not found in basket'}), 404

    except Exception as e:
        app.logger.error(f"Ошибка обновления количества товара: {e}")
        return jsonify({'error': 'Internal Server Error', 'details': str(e)}), 500



@app.route('/basket', methods=['DELETE'])
def remove_from_basket():
    if 'user_id' not in session:
        return jsonify({'error': 'User not authenticated'}), 401

    data = request.get_json()
    user_id = session['user_id']
    product_id = data.get('product_id')

    try:
        if not product_id:
            return jsonify({'error': 'Product ID is required'}), 400

        delete_query = text("""
            DELETE FROM basket WHERE user_id = :user_id AND product_id = :product_id
        """)
        db.session.execute(delete_query, {'user_id': user_id, 'product_id': product_id})
        db.session.commit()

        return jsonify({'message': 'Product removed from basket'}), 200
    except Exception as e:
        app.logger.error(f"Ошибка удаления товара из корзины: {e}")
        db.session.rollback()
        return jsonify({'error': 'Ошибка сервера', 'details': str(e)}), 500

@app.route('/clear_basket', methods=['DELETE'])
def clear_basket():
    if 'user_id' not in session:
        return jsonify({'error': 'User not authenticated'}), 401

    user_id = session['user_id']

    try:
        clear_query = text("""
            DELETE FROM basket WHERE user_id = :user_id
        """)
        db.session.execute(clear_query, {'user_id': user_id})
        db.session.commit()

        return jsonify({'message': 'Basket cleared'}), 200
    except Exception as e:
        app.logger.error(f"Ошибка очистки корзины: {e}")
        db.session.rollback()
        return jsonify({'error': 'Ошибка сервера', 'details': str(e)}), 500



@app.route('/product/<int:product_id>', methods=['GET'])
def get_product(product_id):
    try:
        # Запрос информации о продукте
        product_query = text("""
            SELECT id, name, price, description, image_url, reviews_count, rating, benefits::jsonb, additional_summary 
            FROM products WHERE id = :product_id
        """)
        product = db.session.execute(product_query, {'product_id': product_id}).mappings().fetchone()

        # Если продукт не найден
        if not product:
            return render_template('product.html', product=None, components=None, error="Товар не найден")

        # Запрос информации о комплектующих
        components_query = text("""
            SELECT name, description, image_url 
            FROM components WHERE product_id = :product_id
        """)
        components = db.session.execute(components_query, {'product_id': product_id}).mappings().all()

        # Рендерим страницу с данными
        return render_template('product.html', product=product, components=components, error=None)
    except Exception as e:
        app.logger.error(f"Ошибка получения продукта: {e}\n{traceback.format_exc()}")
        return render_template('product.html', product=None, components=None, error="Ошибка сервера")

@app.route('/products/<int:product_id>')
def get_product_page(product_id):
    try:
        # Получаем данные о продукте
        product_query = text("""
            SELECT id, name, price, description, image_url, reviews_count, rating, benefits
            FROM products WHERE id = :product_id
        """)
        product = db.session.execute(product_query, {'product_id': product_id}).mappings().fetchone()

        if not product:
            return render_template('404.html', message="Товар не найден"), 404

        # Парсим преимущества (если они хранятся как строка, разделённая запятыми)
        product_data = {
            'id': product['id'],
            'name': product['name'],
            'price': product['price'],
            'description': product['description'],
            'image_url': product['image_url'],
            'reviews_count': product['reviews_count'],
            'rating': product['rating'],
            'benefits': product['benefits'].split(', ') if product['benefits'] else []
        }

        # Получаем список компонентов
        components_query = text("""
            SELECT name, description, image_url
            FROM components WHERE product_id = :product_id
        """)
        components = db.session.execute(components_query, {'product_id': product_id}).mappings().all()

        return render_template('product.html', product=product_data, components=components)
    except Exception as e:
        app.logger.error(f"Ошибка получения продукта: {e}")
        return render_template('500.html', message="Ошибка сервера"), 500
    
@app.route('/checkout/<int:product_id>')
def checkout(product_id):
    try:
        # Запрашиваем данные о товаре из базы данных
        product_query = text("""
            SELECT name, price 
            FROM products 
            WHERE id = :product_id
        """)
        product = db.session.execute(product_query, {"product_id": product_id}).mappings().fetchone()

        if not product:
            return "Товар не найден", 404

        product_name = product["name"]
        product_price = float(product["price"])
        total_price = product_price  

        return render_template(
            'checkout.html',
            product_name=product_name,
            product_price=product_price,
            total_price=total_price
        )
    except Exception as e:
        app.logger.error(f"Ошибка получения данных для checkout: {e}")
        return "Ошибка сервера", 500
    
@app.route('/submit_order', methods=['POST'])
def submit_order():
    try:
        if 'user_id' not in session:
            return jsonify({"error": "Пользователь не авторизован"}), 401

        data = request.get_json()
        app.logger.info(f"Полученные данные: {data}")

        user_id = session['user_id']
        full_name = data.get("full_name")
        address = data.get("address")
        phone = data.get("phone")
        delivery_option = data.get("delivery_option")
        products = data.get("products", [])

        if not all([full_name, address, phone, delivery_option, products]):
            app.logger.error("Не все обязательные поля заполнены.")
            return jsonify({"error": "Все поля обязательны"}), 400

        for product in products:
            product_id = product.get("product_id")  # Получаем ID продукта
            product_name = product.get("name")
            product_price = product.get("price")
            product_quantity = product.get("quantity", 1)

            # Проверяем, что product_id существует
            if not product_id:
                app.logger.error(f"Отсутствует product_id для товара: {product_name}")
                return jsonify({"error": "Отсутствует идентификатор товара"}), 400

            # Преобразуем цену в число с плавающей запятой
            try:
                product_price = float(product_price)
            except ValueError:
                app.logger.error(f"Некорректная цена товара: {product_price}")
                return jsonify({"error": "Некорректная цена товара"}), 400

            total_price = product_price * product_quantity  # Общая стоимость товара

            sql = text("""
                INSERT INTO orders (user_id, full_name, address, phone, delivery_option, product_id, product_name, product_price, product_quantity, total_price, created_at)
                VALUES (:user_id, :full_name, :address, :phone, :delivery_option, :product_id, :product_name, :product_price, :product_quantity, :total_price, :created_at)
            """)
            db.session.execute(sql, {
                "user_id": user_id,
                "full_name": full_name,
                "address": address,
                "phone": phone,
                "delivery_option": delivery_option,
                "product_id": product_id,  # Сохраняем product_id
                "product_name": product_name,
                "product_price": product_price,
                "product_quantity": product_quantity,
                "total_price": total_price,
                "created_at": datetime.utcnow()
            })

        db.session.commit()
        return jsonify({"message": "Ваш заказ успешно оформлен!"}), 200

    except Exception as e:
        app.logger.error(f"Ошибка при оформлении заказа: {e}")
        db.session.rollback()
        return jsonify({"error": "Ошибка сервера"}), 500


@app.route('/history', methods=['GET'])
def order_history():
    if 'user_id' not in session:
        return redirect(url_for('home'))  # Если пользователь не авторизован, перенаправляем на главную страницу

    user_id = session['user_id']

    try:
        # Запрос истории заказов из базы данных с product_id
        history_query = text("""
            SELECT product_id, full_name, address, phone, delivery_option, product_name, product_price, product_quantity, created_at
            FROM orders
            WHERE user_id = :user_id
            ORDER BY created_at DESC
        """)
        orders = db.session.execute(history_query, {'user_id': user_id}).mappings().all()

        # Форматируем данные для передачи в шаблон
        order_list = []
        for order in orders:
            order_list.append({
                'product_id': order['product_id'],  # Добавляем product_id
                'full_name': order['full_name'],
                'address': order['address'],
                'phone': order['phone'],
                'delivery_option': order['delivery_option'],
                'product_name': order['product_name'],
                'product_price': order['product_price'],
                'product_quantity': order['product_quantity'],
                'created_at': order['created_at'].strftime('%Y-%m-%d %H:%M:%S')
            })

        return render_template('history.html', orders=order_list)
    except Exception as e:
        app.logger.error(f"Ошибка при загрузке истории заказов: {e}\n{traceback.format_exc()}")
        return "Ошибка сервера. Попробуйте позже.", 500

    
@app.route('/delete_product', methods=['POST'])
def delete_product():
    try:
        data = request.get_json()  # Получаем данные из тела запроса
        product_id = data.get('product_id')

        if not product_id:
            return jsonify({"error": "Не передан идентификатор товара"}), 400

        # Логируем, что получен product_id
        app.logger.info(f"Попытка удалить товар с product_id: {product_id}")

        # Запрос на удаление товара из заказа
        sql = text("""
            DELETE FROM orders
            WHERE product_id = :product_id  -- Удаляем товар с указанным product_id
        """)
        result = db.session.execute(sql, {"product_id": product_id})
        db.session.commit()

        # Логируем успешное удаление
        app.logger.info(f"Товар с product_id: {product_id} успешно удален из заказа.")

        return jsonify({"message": "Товар успешно удален из заказа"}), 200
    except Exception as e:
        app.logger.error(f"Ошибка при удалении товара: {e}")
        db.session.rollback()
        return jsonify({"error": "Ошибка сервера"}), 500




if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)



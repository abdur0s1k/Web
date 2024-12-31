# Настройка проекта

1. Клонируйте репозиторий:

    ```bash
    git clone https://github.com/ваше-имя-пользователя/репозиторий.git
    cd репозиторий
    ```

2. Установите зависимости:

    ```bash
    pip install -r requirements.txt
    ```

3. Настройте базу данных PostgreSQL:

    - Создайте новую базу данных в PostgreSQL:

      ```bash
      createdb myprojectdb
      ```

    - В файле конфигурации (например, `alembic.ini` или `settings.py` для Django) укажите параметры подключения к базе данных PostgreSQL (например, имя пользователя, пароль, хост и порт).

    - Выполните миграции:

      Для **SQLAlchemy + Alembic**:
      ```bash
      alembic upgrade head
      ```

      Для **Django**:
      ```bash
      python manage.py migrate
      ```

4. Запустите приложение:

    Для **Flask**:
    ```bash
    python app.py
    ```

    Для **Django**:
    ```bash
    python manage.py runserver
    ```

Теперь вы можете работать с проектом локально!


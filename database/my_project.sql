PGDMP              	        |         
   my_project    17.1    17.1 1    +           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            ,           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            -           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            .           1262    16388 
   my_project    DATABASE     �   CREATE DATABASE my_project WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Belarusian_Belarus.1251';
    DROP DATABASE my_project;
                     postgres    false            �            1259    16508    basket    TABLE     J  CREATE TABLE public.basket (
    id integer NOT NULL,
    user_id integer NOT NULL,
    product_id character varying(255) NOT NULL,
    product_name character varying(255) NOT NULL,
    product_price numeric(10,2) NOT NULL,
    image_url character varying(255),
    quantity integer DEFAULT 1,
    total_price double precision
);
    DROP TABLE public.basket;
       public         heap r       postgres    false            �            1259    16507    basket_id_seq    SEQUENCE     �   CREATE SEQUENCE public.basket_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.basket_id_seq;
       public               postgres    false    226            /           0    0    basket_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.basket_id_seq OWNED BY public.basket.id;
          public               postgres    false    225            �            1259    16459 
   components    TABLE     �   CREATE TABLE public.components (
    id integer NOT NULL,
    product_id integer NOT NULL,
    name character varying(255) NOT NULL,
    description text,
    image_url character varying(255)
);
    DROP TABLE public.components;
       public         heap r       postgres    false            �            1259    16458    components_id_seq    SEQUENCE     �   CREATE SEQUENCE public.components_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.components_id_seq;
       public               postgres    false    222            0           0    0    components_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.components_id_seq OWNED BY public.components.id;
          public               postgres    false    221            �            1259    16422    likes    TABLE     �   CREATE TABLE public.likes (
    id integer NOT NULL,
    user_id integer NOT NULL,
    product_id text NOT NULL,
    product_name text NOT NULL
);
    DROP TABLE public.likes;
       public         heap r       postgres    false            �            1259    16421    likes_id_seq    SEQUENCE     �   CREATE SEQUENCE public.likes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.likes_id_seq;
       public               postgres    false    220            1           0    0    likes_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.likes_id_seq OWNED BY public.likes.id;
          public               postgres    false    219            �            1259    32815    orders    TABLE     �  CREATE TABLE public.orders (
    id integer NOT NULL,
    user_id integer NOT NULL,
    full_name text NOT NULL,
    address text NOT NULL,
    phone text NOT NULL,
    delivery_option text NOT NULL,
    product_id text NOT NULL,
    product_name text NOT NULL,
    product_price double precision NOT NULL,
    product_quantity integer NOT NULL,
    total_price double precision NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.orders;
       public         heap r       postgres    false            �            1259    32814    orders_id_seq    SEQUENCE     �   CREATE SEQUENCE public.orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.orders_id_seq;
       public               postgres    false    228            2           0    0    orders_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;
          public               postgres    false    227            �            1259    16477    products    TABLE     =  CREATE TABLE public.products (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    price numeric(10,2) NOT NULL,
    description text NOT NULL,
    image_url text NOT NULL,
    reviews_count integer DEFAULT 0,
    rating numeric(2,1) DEFAULT 0.0,
    benefits jsonb,
    additional_summary text
);
    DROP TABLE public.products;
       public         heap r       postgres    false            �            1259    16476    products_id_seq    SEQUENCE     �   CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.products_id_seq;
       public               postgres    false    224            3           0    0    products_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;
          public               postgres    false    223            �            1259    16390    users    TABLE       CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(80) NOT NULL,
    email character varying(120) NOT NULL,
    password character varying(200) NOT NULL,
    profile_photo character varying(255) DEFAULT NULL::character varying
);
    DROP TABLE public.users;
       public         heap r       postgres    false            �            1259    16389    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public               postgres    false    218            4           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public               postgres    false    217            w           2604    16511 	   basket id    DEFAULT     f   ALTER TABLE ONLY public.basket ALTER COLUMN id SET DEFAULT nextval('public.basket_id_seq'::regclass);
 8   ALTER TABLE public.basket ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    225    226    226            s           2604    16462    components id    DEFAULT     n   ALTER TABLE ONLY public.components ALTER COLUMN id SET DEFAULT nextval('public.components_id_seq'::regclass);
 <   ALTER TABLE public.components ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    222    221    222            r           2604    16425    likes id    DEFAULT     d   ALTER TABLE ONLY public.likes ALTER COLUMN id SET DEFAULT nextval('public.likes_id_seq'::regclass);
 7   ALTER TABLE public.likes ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    220    219    220            y           2604    32818 	   orders id    DEFAULT     f   ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);
 8   ALTER TABLE public.orders ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    227    228    228            t           2604    16480    products id    DEFAULT     j   ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);
 :   ALTER TABLE public.products ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    224    223    224            p           2604    16393    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    217    218    218            &          0    16508    basket 
   TABLE DATA           x   COPY public.basket (id, user_id, product_id, product_name, product_price, image_url, quantity, total_price) FROM stdin;
    public               postgres    false    226   #8       "          0    16459 
   components 
   TABLE DATA           R   COPY public.components (id, product_id, name, description, image_url) FROM stdin;
    public               postgres    false    222   �8                  0    16422    likes 
   TABLE DATA           F   COPY public.likes (id, user_id, product_id, product_name) FROM stdin;
    public               postgres    false    220   �O       (          0    32815    orders 
   TABLE DATA           �   COPY public.orders (id, user_id, full_name, address, phone, delivery_option, product_id, product_name, product_price, product_quantity, total_price, created_at) FROM stdin;
    public               postgres    false    228   fP       $          0    16477    products 
   TABLE DATA           �   COPY public.products (id, name, price, description, image_url, reviews_count, rating, benefits, additional_summary) FROM stdin;
    public               postgres    false    224   �P                 0    16390    users 
   TABLE DATA           I   COPY public.users (id, name, email, password, profile_photo) FROM stdin;
    public               postgres    false    218   �u       5           0    0    basket_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.basket_id_seq', 288, true);
          public               postgres    false    225            6           0    0    components_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.components_id_seq', 125, true);
          public               postgres    false    221            7           0    0    likes_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.likes_id_seq', 66, true);
          public               postgres    false    219            8           0    0    orders_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.orders_id_seq', 2, true);
          public               postgres    false    227            9           0    0    products_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.products_id_seq', 7, true);
          public               postgres    false    223            :           0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 16, true);
          public               postgres    false    217            �           2606    16515    basket basket_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.basket
    ADD CONSTRAINT basket_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.basket DROP CONSTRAINT basket_pkey;
       public                 postgres    false    226            �           2606    16466    components components_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.components
    ADD CONSTRAINT components_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.components DROP CONSTRAINT components_pkey;
       public                 postgres    false    222            �           2606    16429    likes likes_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.likes DROP CONSTRAINT likes_pkey;
       public                 postgres    false    220            �           2606    16431 "   likes likes_user_id_product_id_key 
   CONSTRAINT     l   ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_user_id_product_id_key UNIQUE (user_id, product_id);
 L   ALTER TABLE ONLY public.likes DROP CONSTRAINT likes_user_id_product_id_key;
       public                 postgres    false    220    220            �           2606    32823    orders orders_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_pkey;
       public                 postgres    false    228            �           2606    16486    products products_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.products DROP CONSTRAINT products_pkey;
       public                 postgres    false    224            |           2606    16397    users users_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
       public                 postgres    false    218            ~           2606    16395    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public                 postgres    false    218            �           2606    16516    basket basket_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.basket
    ADD CONSTRAINT basket_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;
 D   ALTER TABLE ONLY public.basket DROP CONSTRAINT basket_user_id_fkey;
       public               postgres    false    4734    226    218            &   k   x�3�0�44�,(�O)M.�5��ʯ.�L�Vp��442�Գ���/.I��g�&���8��u��ss��T�sYX h�0��ϕ�Ґ�q�`��
�b���� p�.�      "      x��][sWr~��yL*rw<�$#�- dq��\0	QX��+ZO$u��floe��-��<�-�	$�j��/���/g�3 $(��8U.� f���������bZ,�rwEks��ZM�+�"��T1�W݌?��Ѝ�qa��#�-¯p�KCW��p�ц���q2x_�0}C4ڗx%�xb�q:8����-FgR����=�f=�
F�������Gt�!ځ��p%�)����8p���X��m�����:�X����p�%<��5ړ���V�U_��oU7j�Sk�����T~wo��N�vg�8�ݪm��F�&�)E�'Uu.��c�xp` #��&�xhϻ�3������7!g�&wR�#I��ႾHN&�?����\��p$�������:p��~�8d�u-~���0Uc�\Z(��LZ]P�Č?9G8A�G�l#W@Aۤ�� �E�J&�����/�Ox�G�2^�gg�I�d:�:����,�Rraa26�*H�ρ�-�F�1[���4�"_!��;"_.Nǌ�O`D���q��$�C��z��u�2�N�+��mWaPT�)�%0e��Wxr0�	.ҸsV]��3������c،ց�5 _�n �J�����fu���ɪ��D�&���j�ⴸS���m5�����o�t���8]�l�] ՁI��(��\�C4
�zfK.��CI�g���_�i��2-��J^����Y�M�`xF}6л��BM����xi�A����+&�ڕ�����:��jëC�j�ڪf��� ٩�zOX��<�B��G5.P��H0<��c\�������\�$�H�����	M���.'Xh�`��K�{�+_Y#{�!<h����ⱅ���r'մ*>),V`��W����{��|~�X�d��$���,h$�9Z	2צ�n#�&��lރ�P^�m(l�&��`�4M��lu�x��[�������r��ܦk�T���Ytey��A�+͕�L�z�{�`D{ ��p{/irN�d����+�
��b
��kҕW�����R����'���A�S�*;͆�@�Q���]VRӀ��hq��MsZ��yAK��0�g�?fտ������?�:��;i�:��k�5�(D�=�D���n:�Y���-P�Cz�K��o�_<��oIC�õh�X"طTꦫH��{qކ�e�����W��i8)����"�`BR���߀�gR��������o��k����'pI�&g��� G�X�7(>��Z�:<�Gʇ��/���fKy1;���y%�l�����X���"���O��Q���/�
�Y�N
�O\��ì�F�>
M��Д�ն[{�Jb�m�Ҡ�V����X}�_�[��[!�A�โLO�g0_�r�p =Ѓ����E��~ӎ� �ȿ��[А���I��![/E�L��d !|�^>�yBK*�"d�vi/b��{&NpXրE�G=[#��P����v�E	í@ ���D��9P���5��B\j=P�ۊ�e�U@� ����bl���}^G�D��2����G�;'\hS@8�5��BBξ�PA^�=Vzf.���3$�^]���� !})B��M  w%'���,���*��&Hx��4Xc�fCk\�f;pM��q�l��<��4�[H�mqY��y^kP堒N�hI�2R讻Vm�&�	{r��=!V��b���Vkƌ���k[z.A����{)�I'-��1�\�J�Zz��6���';�+�3^�U�C]�qz������2 �E�i�xJ�� �;�`����;����sđ~�#��
�L�`-2!`���l(��B�x�*�����t�=0-=2���� �x<��-W7�-V˨b��r�,���Zi5k�-�e�����F�ftx�Lv���:5=��W���@���E�1N	U���D�����z�F΄h��:E6e
��1l�{:f��BX %o�4��Î�b1�{���!���pu)5tH�h��J�d�q���w`g�̇u���ȀtI�:8C��r*���LL�(]�˨���,���Z�$Z��O��D�"�x$!�����ٖ��_I��5���ۅ\8Y=0�,�7:�z�����~"�Q`�K߶���k���.<�=�4L$W)��奻ˢ��;��m����ӈ�ba��aOuA��5]r���T���������L��< |W�%gs9g�y¨���6<s�2,2}�HN�"��2�8 G?5�,���\��s�+
_��#���gJ@K�	���V	1<Ai�	�&}����QZ
�u�������M�xY���B�\,���Y�ye��0j
Ͼk��#Sj�S���q.Ɉ���O~̴���TVT�hV�Q���ު�;��{Y��\�Ѐn�A����T�p�H�'0�&c�ʽҢ�+/}Z-	0ެ,�W�\~qB�I�T�q�ɮ�f��5?�$�:]�� t�D!�0���PO698�Ͱ�Jb���̟.H'6�6!�A�Ρ]\��W#:0�*խ������n�݀0���� aPDNU�߈Ф2��C!a�!�K�40�E�iL�L�<��(J�Qj���"�J��9��xm��9n;%�`�M��� Sf��*��XtF1�?�D+�[4[;�c���Vm~��t�8�l�^��uQ�nVT�qҕf}���B$ 73�/��|i�E��rԕYaq�P��.�I�C���6�V���'Y�r~�PyGC��o��ۄ)+�`Sx6Ȗ�F�ٸY� �� Ҋ�+wJ��R.�+�Ӕ'����g�k�-�
\��/�SU[b_	!�sah��J�֥��(ݗ �pG���P<@���S��J��@/,��L	��`f,�Ey.�"�g���P�B��mcr�a}se�^+�S]�J���T�v��7D��ry)�ZR	��1�a	�g���9�K؋�QD͛��z��$��P;�8�I=2�5ō*d���b֩��a������a��eJ��?S��x��q٘FmTU@�g���b(�w_&�gJ�V7d�'�a.UC���hr�X��s�_�26 	�,i�C����|�D��Z��r�+K	��sz�-������a�;��Y`��f e�{�kR	0w��	@{9�)y	�*K������7���oԅ�ܓG#�[w��Nm�]�����b�b��	�g�3tU%�k5� �<z߸�"���A3K��|��fEN��I�	��1����U@� ��M��}[��C��ur�̞�!�&s���4쨇Pj�5�1�+[�\�@ġW��Q�;]�+ ��T*����ޗ	aMtӄ��3��Ԍz|��a	�u�@�v� �:]�u�Y�����RC�Ϛ%5��zF@�& �d��qX2l����lL3)'��O#�X�J�ؑ�)�RoΙ��l�t���;��ۢ�d*�	F��@��&A����雄WǪX'3RU��V���F�1�pX�(?g޶n�y�uk��w�Z�|�̢�e΃�3���f�WJ�I�@��v¶���S&��c��*�j�Gh����L��Dj�
.M	�J�SL��(j��n�r͈��K��Dk���[�����9P���c��)�A�q!\J6f�M��0�Ϥ�ms�	��+���6G�ɲ�}s�I�������ؖ2<9�,(�eĥ[Q��Q��F��_�է�b��\IV9X�;�z��yn���x,��c�E�ZL%�M��YQ��qm���&f���锳���ִU�
8��Q0�'�Lu�A�J�������޳+��D&���&��u��V2�!u?��T7[nn%�Raе�ΨY��������?HƁ�����k��ݠ�w'�����Hl�ܹp�r�n;a��N؋�������5B�=�2�Up�SW09��^8~ -��k¼j�1��X��q}Vu�����sLl'8�J�L�E���Ĺ�X֛�6W� C���m|�L��;�i�b ��8��|�z���4�9�yޘ�g*�r�c#�,�1�c�1l̺r�ّr��[��?����v�m�y�>N�8�#��`�m�l���� 7  [+[;��t���<�V��1kցY���5&�S>��ӷk�LǥJD����tXu���N��"�2�gM���@��i�Ʊ�?\���D �R�ȕۋRr�RD0eT��Q�g�t(N����P2�*��1}k&�|�0��|L ��R
�>��y���ܹ���~���:�m�mD4��x��3�F����d�حX)f�����k�i�������L2�i����L
�rk�F&m*�6��L�v(�ojOU4�{T����v��KCC}m2R�����5���ɇ9vj3#�֑<���͑<d���sp��������=�ɠ�"�s OE��u��q��U��� �da�q��]�T�Ή"��k/�{wFM��?�f�&i���\;�}"�y*񁫭�/ŏ�tN
:��C��}!Jkﾉ�|=P�^�l{k1S6a�Uy��X�� 3xZ.���"vƌ���v���Ф���L�Xg�� t���9M/��y�-ҁ��W{�ʮ����$m�����b�Vk���$�'K@[�C�Z|JKL��3T՛����o����;�}��MG]���N��#�u�V6������!�|����|� ���TԚ[`]�k����x��xTk��\"f���QSB�g��-�
d��.��	W��4F^o�1;d��<%StH�`@ѶHM��<NMG菢k�d��
�ܨί�k�u�)�/˛TC�]�<RZ��䑲q?�f+DA�۰����o%6�̀o%n��JHn�x	��?���y�4\ۇ݈*��ۋ�r�)�(u��P��SnQ���W�x.�|�6,���f�ڪ��ىߖ�JA�'���U�o�I�om��;4�:N����z�0�/���H��{3��$��	%�Kt�_��re:�PHW<!O��)�,z�{��~��SD7����(��H��S�o.�%Q���R��訳��g9�!�1�Y�@$�3~ȗl96���֕��[������,ڏO���3�F� T��(7�{�C�N��]��͞���B�����l�|G|\@��)0k��l�a�Ԏ�n��*U�V}��2˻#8:�&xi��V�Np9^��_{޻�~���g�͇֫
@��s����K�T*9N�5~`\h��++O�`���.$��^%OZ�Cp��Wf�8j����>}k[�n�p�z"����E>�\�Z5���u:�6�W��L�Rt7 E���*jQ�hj��� �$dhC0 �"�׬��z�Uol�l�����|�a�����)>����8�Ǯ�9͆U(�̈́�_2h5�����^	M-�5}M�0��x4�L��K�zQ<"%�-w0�G�e�U�J�y�a0p��{�ƻ9EBSSȜ[�#55m*G��>j�MS3ȴ���^���YdR�y�a�J,cC�h�^��.��FFY�Q���C^��;>L���T)Č?pO�� �p�F/���7y�q��Ww=�#�g�݈ȕҴl�����z��d����t|>�{�EY��r��$/�3�� ;�e�˪{rUI��&/)�J��:}��ުyd�/}���Q%�#"Ԁ9h�-���j-��lq�?�ן[&�N�M^�}���4n��d���:D�^mL�<���P���t�~�nYu�Ѳ�,#:Z��|�l�3(�ɍ���Ȭ�x�U:	��ǡ`�:V^����n�pM���0N�f�ͮI=�7����>r��ø� �G� P�]#TBTth�K�5�y�$��Ki���v��L���dr����w�	>z��<A�
����Z�'(�GPpD(ODP�fC�x2���
�S��B���裏����          l   x�36�44�,(�O)M.�5��ʯ.�L�Vp��26C�5D����r[p����D�D7�̄���Ղ3(�*�H!,� D)�s��"�1A������������� {�8)      (   h   x�5�!�0P�9Hf�������V`q`�
2ܾAԽy ���z�eY{^�ݪ��9+�ﾞ�A�������� �'w�¢�;�Qy����0���6+      $      x��]�n[Wz���b�@����Ns'[����H�3A;��I�Ȓ!əq�:X�]�2���L0��^SP�hmQL_`��I���:�77e93Ix1���������U�������ŅO�;��sŉ��	���_������ԣvtDat5�Zt��<:�<?u6��Zg��D� :��w�:[�2����3�x���� :/8�?�S���P�&ڏ�����mxF\������q�C<DMq��E'�M�m~�����B;���
ĝ�Q��)�ntv�=��\=��?7��{�S�C|gM��ߕ��O���WQ�(�Y�Z��10�-h>uY��GF\�<��x�>~��?7�h��k�S�|K���!^��
aEN�O��3hlt(F�E���!����D��ȟ`;�ag/Xs
}��lc3�������s>+�_R7�v>��	�	�ӖG��Sl�z&^|��"�]���i`_Ž��C|E�D�����=�FMWc(���zE4������k��^}�����G�š���&r#C���������������IN�Њ��YLۢ�(��v��g�lh���|p�~umau�����2��7Ib#
��	R'�$������Ǿ��YR��A�F M܊�S�vo�bZ��$�t��d3
�.�k>0�����w�>��1??E[�{���o�ɢ.�py	��I������6��u�9w��\���+)v��~�ct����0���2�s(Z�qz�k藸�aq�|"n�Ą�"j栃�X5�pP	���!X� �����?�E�pÂ8�h䎜� '�	�{B��Ʀ�":��R�F1@ �;�' H&��#�~]c���&8�-F�9L7�'!�A=�;�D�>�e!	رW���1X����P���N�$v���렳��-�A�!�x��c�`h"|���
G��@I�ϻ��}�+��6+����>B@C>Q��»����M�9V�N�Ɉr_".�?앏���U�t����y"�!�M�r�A?:
D+��S\�;.kj��]�����4�<�!R�	3,�y_�����$F��#�Ѫ&Ś�����փ������G��p�֞B`B\ ;��)2��{&��ق>5�3��8��b	yq<΋ߤ|/�+��g$�_���a��\[�	�﹈���ES��^�1�03~���<|w�.�-�n�@��p�!�ë����M�#��lXh��5����5H@��"}�B�����a���_��zA�Q�q`f�jԊ�3+ ��אح�V�Z���r���W���h]}���'�g��7$*1x�0��4mK�7���3��sO��R�x�w�՚M^����p2�.�q<�&�����p����4P�|�����wn�J�1����l����x�Ң�Q�@8�uWjZU	|Bw��H�u�'
�߀x�D_v^�fn��2MN��̽�m$�Z��V$e�b��: VՆW2x"d2�`f�Tץx��`������|�k���uh���7�ք}n#r��8�u�<�A�O:/LI!;�aY*b��@{��.�S�B�T�������w��&��vu�ĸ6�U������AK|ӆi�ޒKE
^�*�E��2���MϷP5C�g�tL2�^��Ԥ�6`��l�:�u�"k O*O����3^;�W{ubӴԛp^pUQ'�Z�8Z�o�j���o�_�p~C�&J�T{��~��]�\c3� )Fj��P1h�jF�t�4oX���L� w1ැ(�B����B!��x7k�`rn����\qt¦F��CA:�xY����e=
>���m\�<��:RH`�J7ޠ�5�ča�������ҹMV�˴�.��p�h�����R�K��
Vf)`�c�s[��ji�5��U��u�:�M�n�:��������c��N"1Rs`��##DC�
V���OM˥Z1�?\~�.�$vy�I,��|�8�GT���}nj�u��_k$���:tM�D����Mv-k�>4�SX���H�I�Z�� �ް#M�mSSx��+�Ϙ�XX9-v��d�����D�^ь9����[ׯ��ʥ��p9v�02��"���M��p5`#�@ތ)1�ZG��wcEq�~�\K'M�(R���H3˫�ÖU���bZk��X�W��s�ņ;_�={��FV.�9��9(��VAV��c��C�A��#�^�]R�0����U?\�ۉ�������K`ϻ�`�>��9�O5�ќe:�e�=�+�}vi`T���oM�Ε#C��f��N�Π�<�DK�LedH���J�A˂ׄ40�-.�p1����Z��/G�Fdq�"���dn�`S����Cܦl���F�M/�O���M �x���9<����f�����n�����d��+&�g��4ޝ@���0/�w��b�$:�Gu]sφ�Й�e�B�F�!�0�7�D��D�'�d"���źD�:�$�۾^kE����͐Frh�xI�F��c�y�^Z��!��OQ�lWp���/�D;=95=�.��-�.�Nڋ�ZZ�ۘh��4N\A���0��}iQF*��x� 9��;Q;�˞L��$�ٍA6'Q���D�5J�dF�8��Sl�X~Q'N���P�'wF�uD�g=����evu����(�TI�m�S���O{��Gh���T�`+Gڨ?�}���&�2w�Uv[�������z��l��k��x]��y?o�X���}'V�xm��=�dyl��u�^��r�69[2_�Ȳ��M1�f��)�g�i�h\P�s�������ÑB�d���I^nWX�mb@���f;;��HM.m#l�\�v��LΊ�xf��/���b�Ͷ\��h#}?!��C/��HG+Me@b�^
���T�2��1��	f�DN���3fU&��u��g����IT1�lF;�޸ߝ�Frerێ���>��Y�5�u8}�1<��xJ\3�7@*2�+|�%GN��6d��AE���E'��P��;�N��i�i�^�{[��p��ƥ��x8���W�g�抅�hi�TJ����	�[,F(�3����1R�?�k�F��g,�F&g�ɏ�3�6~r3!��p�Ha�W���
8��I�����)�[.�A�P	�N�S��RRa��#SSx{J��%`'5;��q@0ݛ|��LU�lrH�8��Q��'}�櫎�-�>W���[�,�������������q�I& ��L�
-�(��=���8n
f59;�Mm�W"mӁڂ�g��@��r�ޝ���� s�bq�0T�H��C�5#���Q3��+&����N�b4y�9vj�Pi�Y��g�<)+n)�_�D[����m���:u�9}	O�CY�/" ���k���2��/�je�����܂��7�%�K+%�w��I�O�o��|�6\xms��k��Vj�ᏺ��� 3#�������98Z/M���������8�%�&J<�рʮ��a�|�hҟ��s��byh�2}ᔀO��H�Nd_�)���h��:��1mly/���c�������������/�gh���]�f��u��l�l8�6�$zp������ZHAZF��+�GW�V>���G�W��.V�'�>1���b=��.��7��KH;Ң�YRpɉ���EJ�	��ie��N?'g6�K���7o
r,�&���ĉ�������u���ji:�;�	�ɄF��_�E0d�m�0�y7��24Sܜ��Ŧ�ȪL�0���/{jJl� `M�8�gs����,v��g5���Rz��&��M#¾W��{}޻��<;9�J;8�:z�EÊѡ����;��2��a�8ܩ`)�{ڸ��Ȍߓ)4�Ľ!n����ւ�+�.�D/�z ��aw�Ǐ�e��B���?O%S����գn�6@J)��z�����ne�g,c7խ'�֗zKf�K�^Idr!̐��(w�毒\zB�uw��w%�<�-�0�ބ���d#:�i=����25�W,PL?���^}����+r���ݯ��G�j����3{%�<�\� S[Q�����    .^�G�;J����1�y���Q'�1�34P4l��;L�MOW>&�ߟϕ\�rn��D�>ѿ�h�o
�ɴO�}腺@�
7���ݙ��M�G�����4�~��E���T֧�>���\^7�ŨF3y�έ�p�4>4>a��g�>s]s����g�>s���u�k,ws��������pa$7�.H�7%�z�]<� co�Å�'[��䞽��y�;�]v�[�:\5r(F�RoJ*�q�/#懓Ɐa���ŏ>^_{X�ާ����Կ6=w�h�{&��{&)jǕ<(Uj�8��������9��8 �-�r8
kct�������3������/<�%+��c�0m:G�h�!�C��G��������ۼ_?D��@�x:���"ϡJ��S���'�3;���Ճ�����op9�X

�B05{=nN(�N�$�rD	{�;��<`r��=����VJ��J8�0(��,j�V�AJy��9�G]���b7�M�oT��3L)��xO�&SK��ՠdaG5�\7�ͅ�輼<����V�r�O�Jc�-�w�c6�N��m
�ss�����K���J�XBN�_��r����
C��#g�uD�u5ޢg��M�n*�U�iU�γ@�%V�u�	�H�v������̑��d�Q�^�����XL�<`�b;��,��*��үd�X'� e��Q��)�S�$]��PJ� �]Yx�����%�)�6;=��p���$b ��w��d�I��&Vvi�A��찐=�g�����i� ��jO�����F�}��G���ju�����rqj� nE�xd��ɒQ���ZMTB�6�/����Ke�9v`�Ԧ?��yw+�0�ZMo#�J�p�����ax��,ҡ��ǟ��p�߉�	ŉFH<��e�935ΚP��0�!.��;s���H�t�w�4����m-�?d����&�E�#�k]���+��ťŵO�{�Ĺ�a͹�EI������j�y0}�����'��4o�t�џ������<`U>&��X��*�8@��ל&)Bg'��rD�xP%W�9�a}����`�s�ʗ�yt���*���M�fi��b(��X�)`�)Y�������oA%g���;l&�-_�gb"?�7�D�H2��L �0���ru٧z��������Y[��^������'8��t��anS�8��g��o���0�p�)��@�#�]0w�N0v���tuzK�Yo�	e�|�Ki!�����4Mt#�zڬ�f��3���6j�t*��u"x@��y���T&�A�^�PՀ�D�g:��k6&�J�A��:7���L,���d��(r��~�>ZZ��T,��Zem��rt@a�ek�diI) *�B���;CCqO4��M�nԺ�'}����!㢁V�Rۊ���`�h%�L�9��4�5L8�ә �w�����2�I>[Wf�	4�;��\�h�$����zG]�Y�Qh�}����J7b��\#5)��������ލ^)��׮�E����'�5]�jM��{Tv��ڌ����M�n��m�o�M���F&�{��{tQ6a
�,CJ���(�0�\�p0{���I57q���>V6⚭m�qt��6�k&Ĵ�L:��+?]���7R_�������G�;K��nBf���p���c>(q(��m,��LY��G
�tD�yj��l&�x���a��\ycBrǖ��J3�6�lg���ʬL3�S�H?Hr�5�(#�ǹ�P�hc�%m��PL��̬86}i�T�����ܛ)�M�W�̕�2P(�3����������Dti�s�]:�(&��Y?x��T�Vid���Y,�oSBJdT8��_���G�.��ej��8f"�
&��N|+p�~����3��Gd�A��HlW�kE�^+��藝�ر��4�C��=fo���};�;�)���D2��Q���U�d���������=�g��BY�âtNb�s��o����N��PR}��p ���h��ʫ* `�5�"ӋBd0:D��b"%��p�Ͷ�5�
�������[D�𒾬�z>�Q<���):���<iFY�ۯ}�"E�!״���^zb�`M�@%��:Q��ʖ�ڂ,��노� �[�u�F�g�4i{w�����N�~�j	s�n��v.rS��cF�< G�ҽ����)A��U=���� c_F:uĳ��N c}��ֿͺ��4ؗ�=�YIw����fx(E��{��DZ����,e!VC_���ӕ�n+.���:���<BK
l�|8�ɖ<�V�'v�;�r7g����W+3�ʪ`ۙٱ�����0��W�A���vq��]�pt��=Ϭ�|Wٙj����7�?X��2�C h��>?���w<�(M#QG��+&q���������G�G���j�S2�:����l=���<X{$��;���UwnNO3�b�j$\7	�<q��pdT1x���6����|�L=�,h��K�Rc�3�j`���J����p�G�d|�]�tΉ�$:�Y�0���B�0l��A��:#s{(;��3��ǆ*�.��>�5������m�b�*�.��S!!e�an#���"��M���a���=��#�!��CONW��}��]���!�2�鈙�n���8Us�;��M���D������ڣ�� �J-}N��~��� :�X�L��(�(_�QhkS)1ҡ���2���X���p���]�I����P�ݚ�ܚ�JQ��MB�r#�:����}������,r�F=�i:A%`x����'���x�ՀD��}5��|�Հ*��k#��xc��IuY�ŏ[ѬKV�E�Lu�&���Ό��gp��[<��\{�PI c��1%���T9�Un�Y6�"��dajmh�W�ת��IzG�Ŧ�i~����c�'(�[X_&�p��%�#��<��<'�Rap��~Ѝ1�d�Ȕʢ��ڷ{�OSP�F�F��=5^wW�]Y]�Z�-��V0R �{��&F�Ԁ�J�����o8Nx����б�My�;U���<w�S�Z5̣�vl ~�$ؒ��sܽi]B+K����+�2�;*-	dB���?���5}���6,@ba�g7R[h����҈̂y5�'^P�2o��X,�]��l�#�����@2P�IkW�V�&�~\	�+K��OV���K�zSqea�rn؅�/qY�ަG�9[ү�g\SN)(���@���Ȋ �\��� �u�g�\6x%%����JJ�<�֨*$��,Y���'׭7�=�bA�'�4wXǆ��=�`alik
7��;��;}����r�O0؅�%�JPW�e��^
=�{^��}(j��~oȆ����W���:�:�������+�1�k ����[����ag�dV�)�@��.�#~�0W���Ԧ�CvdE�l�Jl/����A��{x�CCj�1�u#fWX��4������>K4j$-Ð#3/^����kw�g��#
y}T]_YY�8��։�PK۪ǫ/q�^L��?�;�����X�-�ꋧ{w�@i�|p���f�*��a�V����'�k	n/.�W���?[\_�8p����G��R�I[�ȟ+�Q[�ew�'"��*r����i}�0���	*�ڀ��_�(�	����A:����t��� �]�C���e��ؗd����-"G��<aWL�i�{HWZB��ZY���)���9����g���c� ��蘥�}8XU0y�yOȜ�U�B@��{��β����F�fM����jui���X]&W�ׂ���+(��%�n2)��� ^E<!'"���k`��b�}tbI.���B�@�K���D�1&�|sr�������d0�ni�����2�j�ʆ�x��6ִp��:'�L�3��;ו��>=q)��A�˞�F	!�Ȳi����T4�R�풣J���]FW}���U��p��_�<��m�0R�!��1�B���B ��v�*��؀�RZ�ci�i�}���^F1¶��w��z���ޓ\4;2W���.���9��A�P��dU �  ��:�Z\[XY��G8���
��U;1�c�l2cnz*k�C.@�s�j�L��p>�N)�ȝ���gڶ�m^�����+?�K��\�Ʃ�j2�r�����-q�37��5'��U��/#�+I�WWT�㸪���[�V;��ڋZ~��9��p�w%��$��3�Y�G��S��O~�P1R�yt����Ŕ��w3��겱�P�4Y��2,pt��at���3�݈���V�����y;��u,?��I����)���>147;���B�h�]�xu�A�;7�+S]͏�Y�� %�kT�GhwX�A\i�������'�I��C���'���#OaQt�2/O^��� �^z
��]���r��&zh�S�I��{�Qh�)fOo�P�9���X,d|ϕ�L~k�ǀK�g�)U��C�ؽ�v���*�2)V�����y�����u��y@8-Y�d^�H�������
a��bx�r+�̜I�������>o�zz+�X�
�vt�X�������s4x4NP�J�
���
�~b�<�՝J���H�J����#��5x�	�Bm��N�e�X�j=�����I�[_�[S5>�XD�řl�5�R����Y�^�����O������S�D�MAS�Ͱ������z��}P�b-��,%s<{}4dF�`t�TP�en�]jW�w�M&����JF0��*M�RnI`r�6nV�]�#W�;���}l��b�H6��9w,/ή,.���EqoU>Z������ie�&W>
��DY}*��]���SG�B~���8\:R��s9%��/Έ�z�����RfdֳI
r����{��9���p����~�L�\ܮ�Got��N,����Ty��֮�#z�Z�:-\c�FY���u6v[:�5Ry`�=1�W�#&�M4^�@׺��E9�)|gh�2<�ʥcR���QC�8�������Ȅ�7�~��79c�+��W �EJ����'Э�.�7���&���zuue9�ZyܭV�d;í�|E>�0���0�oeᒷ�K&�u�)b��DK�?v?��;@������ݯ�#�17��Z�,���%	`LnF���"z� ]� 1
�۔��W�se<�����ر"��(�JTs_ۛc%�@һٱ��Od:�H|���A��s����E��f�@�$JB5V*��J0œ����ۙ�؇����/)��a3+Pd��}�e<i�uQʓ&�'0*�?�?���         �   x�eN��0�ۯ�X�BQ6��/ !�mP0��l��O0�ɕ�
�7<��:89�]r���H�'��<Aj�����{��B�9��q�z�T�ю�Y��8/�/G\F?�#��OxCC�4�jk�D0��X�>a�s�.�)�>��-4�������n�<[��8��-<P�r��J�,�3����S�pH1�ۛ`�     
## Esther Nieto Medina - 2º DAW

<img src="../aromio_eniemed/src/assets/Portada.png" alt="Portada de proyecto final de Esther Nieto Medina">

---

# Documentación de proyecto final conjunto

### Índice
<li> Introducción y desarrollo de ideas y tecnologías.
<li> Descripción del resultado.
<li> Instalación y preparación necesaria.
<li> Guía de estilos y prototipado.
<li> Diseño.
<li> Secuencia de desarrollo.
<li> Pruebas (endpoints)
<li> Despliegue.
<li> Manual de la aplicación.
<li> Conclusiones
<li> Bibliografía y referencias.


---
*Nota: <a href="https://github.com/eniemed/aromio-back-Esther-Nieto-Medina">Enlace al repositorio del back-end.</a>*


# 1. INTRODUCCIÓN Y DESARROLLO DE IDEAS Y TECNOLOGÍAS.

La realización de mi proyecto supuso varias etapas de desarrollo, siendo la primera de ellas el desarrollo o espectativas de el proyecto con antelación a la implementación del mismo. Con ayuda del documento de propuesta de idea de proyecto entregado anteriormente repasaremos aquellos objetivos que me propuse en un principio.


La idea inicial era crear una aplicación web de venta online de cafés artesanos llamada Aromio, que se compone de varias páginas con distintas funcionalidades con el propósito de terminar con una aplicación lo más completa posible y atractiva para un posible comprador.

Cada producto consistía en una bolsa de café artesano con un nombre, imagen, descripción, sabor, región, peso y precio.

### Las funcionalidades y/o páginas planteadas eran las siguientes:

<li> Una página de inicio con un botón que redirija a la tienda.
<li> Icono de carrito en esquina superior derecha que guardará los productos incluso tras el cierre de sesión.
<li> Icono de modo oscuro.
<li> Página de tienda con un buscador y filtrado que muestre todos los productos disponibles.
<li> Botón de añadir al carrito.
<li> Botón de añadir a wishlist.
<li> Producto con fondo personalizado para darle un toque personal a cada uno de ellos.
<li> Página de producto individual accesible desde la card clicable de cada producto en la tienda, la cual tendrá más información del producto.
<li> Página de wishlist donde se almacenarán los productos que el usuario haya preferido desde la página de la tienda. Desde la misma podrá retirarlos de la wishlist o añadirlos al carrito.
<li> Página de perfil de usuario que muestre sus datos y permita el cierre de sesión.
<li> Formularios de contacto, inicio de sesión y registro del usuario, teniendo un impacto en la base de datos para que la web sea funcional.

<br>

Las tecnologías usadas han sido las mismas planteadas inicialmente con un ligero cambio.
Para el desarrollo del cliente he usado Vue.js y CSS, pero, a diferencia de lo establecido en la idea inicial, el back se ha desarrollado desde cero con laravel, teniendo una base de datos propia y una api creada por mí misma.

El despliegue se realiza en local con un docker compose que levanta la base de datos, pero no nos ha sido posible encontrar una manera de desplegar back y front en una plataforma como Netlify.

---

<br>

# 2. DESCRIPCIÓN DEL RESULTADO.

El resultado obtenido ha sido en mi opinión bastante satisfactorio y completo. Analicemos la lista de propuestas que he detallado en el punto anterior y veamos cuales he realizado y cuales no, y profundicemos un poco en cada una de ellas.

<li> Página de inicio con un botón que redirija a la página de tienda: Realizada. La página de inicio muestra el nombre de la web y un pequeño párrafo que deja clara la intención de la web y anima a los compradores a dirigirse a la tienda a explorar los productos.
<li> Icono de carrito con persistencia: Realizado. El carrito almacena los productos elegidos por el usuario con su foto, su nombre, su cantidad y un botón que los retira del mismo. Más abajo cuenta con un botón de vaciar carrito completo y otro de comprar los productos. El carrito es un icono que al pasar el ratón por encima se despliega con un diseño agradable e intuitivo.
<li> Icono de modo oscuro: Realizado. La lógica del modo oscuro está implementada, sin embargo los estilos no están totalmente pulidos.
<li> Página de tienda con un buscador y filtrado: Realizado. La web cuenta con una página de tienda que muestra todos los productos en cards con su información y un estilo personalizado para cada uno con la ayuda de un archivo css importado con clases para cada uno. La tienda cuenta con un buscador que funciona a la perfección. Los filtros decidí no implementarlos porque me pareció algo redundante y cargante para la aplicación teniendo solo veinte productos y un buscados que ya hace cualquier tipo de filtrado que deseemos.
<li> Botones de añadir al carrito y wishlist: Realizados. Ambos botones los encontramos tanto en la tienda como en la página individual del producto. En la página de wishlist también encontramos el botón de añadir al carrito, todo funcional y con persistencia en el localStorage.
<li> Página de wishlist con botón de retirada de producto y botón de añadir al carrito: Realizado. La página de wishlist guarda aquellos productos que el usuario haya elegido desde la tienda o desde la página individual de cada uno, así como el botón de añadir al carrito que hemos comentado anteriormente y un botón que lo retira de la wishlist.
<li> Perfil de usuario que muestre sus datos y permita el cierre de la sesión: Realizado. El usuario cuenta con una pequeña sección en el navbar que cambia cuando inicia sesión. Esa pequeña sección contiene su nombre de usuario y es clicable para redirigir al usuario a su perfil (el cual está implementado en una ruta privada). El perfil permite ver los datos de usuario así como un botón de cierre de sesión que devuelve al usuario al inicio y realiza su función perfectamente (desloguear al usuario).
<li> Formularios de contacto, login y registro: Realizado. Todos los formularios están validados y a excepción del de contacto, conectados a la base de datos para crear y loguear a los usuarios.

---
<br>

# 3. INSTALACIÓN Y PREPARACIÓN NECESARIA

Para realizar el proyecto, hice un "npm install" desde Visual Studio Code, intalé pinia con el sencillo comando "npm install pinia" y "npm instal pinia-persist-plugin" para instalar el conveniente plugin de pinia que se ocupa de la persistencia en el localStorage.

Luego instalé laravel por separado y desde phpmyadmin introduje un script para la creación de la base de datos, las tablas y los inserts. Más tarde explicaré los pasos a realizar para conseguir desplegar el proyecto en local usando docker.

---
<br>

# 4. GUÍA DE ESTILOS Y PROTOTIPADO

Aquí está la guía de estilos que he entregado para la asignatura de diseño:

<img src="../aromio_eniemed/src/assets/guia-estilos.png" alt="Guía de estilos - Esther Nieto Medina" />

Y aquí una captura del prototipado:

<img src="../aromio_eniemed/src/assets/prototipado.png" alt="Prototipado - Esther Nieto Medina" />

---
<br>

# 5. DISEÑO

Para la realización del diseño me dejé llevar por mis preferencias personales, dándole a la web una estética que he considerado agradable. Procedo a numerar el diseño de cada página y una captura del mismo desde la aplicación de Figma. Adjunto enlace también:

<a href="https://www.figma.com/file/iGHjwl7uJfKTRgcvnKxMAT/Proyecto-CLIENTE-%2B-DISE%C3%91O---Esther-Nieto-Medina-2%C2%BA-DAW?type=design&node-id=0%3A1&mode=design&t=dY9kLuaJ5kVRsmgD-1">Proyecto de Figma de Esther Nieto Medina</a>

<li>Página de inicio

<img src="../aromio_eniemed/src/assets/INICIO.png" alt="Inicio" />

---

<li> Página de tienda

<img src="../aromio_eniemed/src/assets/shop.png" alt="Tienda" />

---

<li> Página de wishlist

<img src="../aromio_eniemed/src/assets/wishlist.png" alt="Wishlist" />

---

<li> Página individual de producto

<img src="../aromio_eniemed/src/assets/producto-individual3.png" alt="Página de producto individual" />

---

<li> Página de contacto

<img src="../aromio_eniemed/src/assets/contact.png" alt="Contacto" />

---

<li> Página de inicio de sesión

<img src="../aromio_eniemed/src/assets/login.png" alt="Login" />

---

<li> Página de registro

<img src="../aromio_eniemed/src/assets/sign up.png" alt="Registro" />

---

<li> Página de perfil de usuario

<img src="../aromio_eniemed/src/assets/profile.png" alt="Perfil de usuario" />

---

<li> Página de error 404

<img src="../aromio_eniemed/src/assets/error page.png" alt="Página de error" />

---
<br>

# 6. SECUENCIA DE DESARROLLO

El primer paso para el desarrollo de mi aplicación fue decidir la temática. Pensé que una tienda de cafés era un concepto bastante agradable y me daba una sensación de comfort que me motivaba a hacer el proyecto lo mejor posible y esforzarme al máximo. 

Una vez decidido, lo primero que hice fue el diseño. Con la ayuda de mi profesor de diseño, Alejandro, creé un diseño con el que estaba totalmente cómoda, y una vez estaba listo ya solo quedaba empezar a implementar el código.

Me llevó un par de días acostumbrarme a desarrollar un proyecto así en Vue, pero hasta ahora es la tecnología que más me ha gustado aprender y usar de este año. Realizaba componente a componente y le aplicaba los estilos correspondientes hasta dejarlo como a mí me gustaba, y con el tiempo fui puliendo las funcionalidades hasta que el proyecto ha quedado terminado.

El desarrollo en vue se me ha hecho cómodo, por lo que no sabría destacar ninguna dificultad por encima de otras. Creo que en general he aprendido mucho con este proyecto y me ha ayudado a mejorar la organización de mis proyectos y con mi fluidez de programación. Donde realmente he encontrado grandes problemas ha sido en el despliegue y en el desarrollo del back-end, sin embargo, con mucho trabajo y muchas horas todo ha salido hacia delante.

Para finalizar con este punto, quiero señalar que la tecnología de control de versiones que he utilizado ha sido Git.

---
<br>

# 7. PRUEBAS (ENDPOINTS)

Tras consultar con nuestro profesor de DWES, nos ha comentado que las pruebas para la api que podíamos realizar no eran otras que los endpoints en plataformas como insomnia, así que eso es lo que he hecho. Adjunto capturas de los endpoints de algunas de las llamadas a la api:

<li> Llamada a productos (todos los productos)
<img src="../aromio_eniemed/src/assets/products.png" alt="Endpoint de todos los productos" />

<br>

<li> Llamada a un producto por id
<img src="../aromio_eniemed/src/assets/id.png" alt="Endpoint de productos por id" />

<br>

<li> Llamada a users (todos los usuarios registrados)
<img src="../aromio_eniemed/src/assets/users.png" alt="Endpoint de users" />


---
<br>

# 8. DESPLIEGUE

En este punto voy a comentar los pasos que he tenido que llevar a cabo para conseguir poder desplegar la aplicación.

Como he mencionado antes, no ha sido posible el despliegue en plataformas como Netlify del back-end, así que por ahora hemos acordado con los profesores en centrarnos en el despliegue en local usando docker.

Por ello, el primero paso ha sido configurar el archivo .env en el proyecto de laravel con la ayuda de un curso de openWebinars sobre el uso de laravel con vue. Una vez eso estaba hecho, creé un docker-compose.yml con la información sobre la base de datos, los servicios (mysql, phpmyadmin y laravel) y los volumenes necesarios.

Una vez todo estaba hecho, solo tuve que iniciar el contenedor y ejecutar en el proyecto de vue "npm run dev" para poder visualizar mi aplicación.

En un proyecto nuevo, la persona que quiera desplegar mi proyecto solo tendrá que hacer un "npm install", levantar el docker-compose.yml y "npm run dev" en el proyecto de vue.

---
<br>

# 9. MANUAL DE LA APLICACIÓN

Como guía para el uso de mi aplicación, voy a detallar todo lo que puede hacer un usuario al entrar en la aplicacion.

Cuando el usuario entra, lo primero que ve es la página de inicio descrita anteriormente. Desde ahí, puede acceder a diferentes sitios clicando en cualquier enlace del navbar o pinchar en el botón central que dirige a la tienda, que es la página que realmente le interesa al usuario que entra en la web.

En la tienda visualiza todos los productos. Si decide comprar alguno puede hacerlo clicando "Add to cart" y verá en el carrito del navbar el producto que ha seleccionado listo para comprar. Verá la foto del café con su nombre y las cantidades que por defecto es 1. Si quiere puede aumentar o disminuir la cantidad de un mismo producto dándole de nuevo a añadir desde la tienda o desde los botones implementados para ello en el carrito, un más y un menos. Si el usuario desea quitar el producto del carrito puede hacerlo desde el botón con una X en el centro o disminuyendo la cantidad hasta menor de 1.

En la tienda también puede añadir un producto a favoritos desde el botón con forma de corazón en la esquina inferior derecha de cada producto. 

La tienda cuenta con un buscador en la parte superior central que filtra por cualquier tipo de palabra, ya esté en la descripción del producto, en el nombre, o en el sabor.

Para terminar con la tienda, cada producto es clicable y dirige al usuario a una página individual para ver el producto más detalladamente.

Esta página cuenta con la foto del producto en gran tamaño a la izquierda y toda la información del mismo a la derecha. Cuenta con los mismos botones de añadir al carrito y a la wishlist que la tienda.

Si el usuario desea ver los productos que ha añadido a la lista de deseos, puede clicar en el navbar en el apartado "Wishlist". Ahí ve todos los productos seleccionados con su información y su foto, así como un botón para añadir al carrito y otro para quitar el producto de la wishlist.

El usuario puede registrarse o loguearse en cualquier momento desde los botones en el apartado derecho del navbar. Cada uno de ellos (login o registro) le llevará a su respectivo formulario que pedirá unos datos determinados sobre el usuario. 

Cuando el usuario se registra o inicia sesión, en lugar de los botones de login y registro verá una pequeña sección con su nombre de usuario que le lleva a su perfil. En su perfil se encuentran todos sus datos y un botón para cerrar la sesión.

Por último, si quiere ponerse en contacto con el equipo detrás de Aromio, puede hacerlo desde el apartado "Contact" en el navbar, donde le espera un formulario con su email de contacto, un campo para escribir el mensaje que desee y a la derecha un panel con más información sobre la empresa, como por ejemplo, los horarios de atención al cliente, la dirección de la empresa, etc.


# 10. CONCLUSIONES

Como conclusión, creo que mi proyecto ha resultado bastante parecido al que tenía en mente en un principio y me parece que he avanzado bastante desde el principio de este año. 

Por supuesto, aún hay muchas mejoras que hacerle a este proyecto para que se asemeje a una aplicación de uso real, por ello empezaría añadiéndole una página individual de carrito al clicar en el icono del mismo (manteniendo el hover, ya que esto sería un extra). También añadiría la opción de editar los datos del usuario y la posibilidad de eliminar su cuenta de la base de datos, así como añadir algo más cuando se pinche en el botón de comprar del carrito para darle algo más de realismo.

Hay muchas cosas que se le pueden añadir a una aplicación así, pero esas son algunas en las que he pensado hasta ahora y espero poder implementárselas en un futuro.


# 11. BIBLIOGRAFÍA Y REFERENCIAS

Proyecto realizado por:

<li> Esther Nieto Medina

<br>

Con la ayuda del profesorado de segundo de DAW.

Configuración de laravel gracias a varios cursos de OpenWebinars de laravel y una vez más, el profesor de la asignatura.





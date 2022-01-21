# Challenge_OS

Proyeccion realizado en React con NetCore


Paso para levantar la aplicacion:

----BackEnd
1) Ir a la carpeta BackEnd y ejecutar la solucion "BackEnd.sln"
2) En el Proyecto "BackEnd" abrir appsetting.json
3) En DefaultConnection colocar el servidor y las credencailes que se requieran,
   y mantener el nombre del initialCatalog.
4) Abrir  "Package Manager Console"
5) Poner en "DefaultProject" a DataAccess
5) Ejecutar el comando "update-database"
   (Esto creara la DB, armara las tablas y agregara registros iniciales para poder usar la app)
6) Verificar que el proyecto "BackEnd" este seteado como inicial
7) Ejecutar la solucion (esto abrira el swagger)

----Front
8) Abrir la carpeta frontEnd con el Visual Code
9) Abrir una nueva terminal
10) ejecutar npm install
11) Al finalizar la instalacion, ejecutar npm start

Los usuarios creados son:
user: gestion@os.com
pass: 12345

user: admin@os.com
pass: 12345


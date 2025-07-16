
Hello User,



this README shows how to run my project about a PERFUME SELLING WEBSITE.

for convenience of transfer, 
I deleted node modules folders in both Client_Front_End and Server_Back_End

these modules have all the dependencies that are needed for the website to operate

so for that reason they need to be re-installed


HOW TO DO "npm install";

------------------------------- FRONT END NPM INSTALL ------------------------------------------------


PART A : NPM INSTALL FOR  ----->  "Client_Front_End" folder

1. open vs code ( if you don't have it, please install it from the internet  )
	for simplicity, you can do this from the terminal with no editor if you know what youre doing

2. drag the Client_Front_End folder into that VS code window that you opened,
	this will set the terminal in vs code to be pointing to that directory

3. open terminal in that VS code window

4. type the command ------------>   npm install

5. wait for the installation to get done






------------------------------- BACK END NPM INSTALL ------------------------------------------------


PART B : NPM INSTALL FOR  ----->  Server_Back_End folder

1. open VS code ( a fresh window )

2. drag the Server_Back_End folder into that VS code window that you opened
	this will set the terminal in vs code to be pointing to that directory

3. open terminal in that VS code window.

4. type the command ------------>   npm install

5. wait for the installation to get done.



SETTING UP THE DATABASE ------------------------------


1. Open your terminal on your computer, ( use run (windows logo + R ) and type in it CMD to open the terminal ) 
		or search terminal in your computer.

		Iam guessing and hoping you're familiar with MONGODB.

2. look for your mongod executable file (mongod.exe)
	if you installed it at the root of C. it should be easy to find 

	ITS PATH SHOULD LOOK LIKE THIS     -------------   "C:\mongodb\bin\mongod.exe"  

3. if you run such a path in your terminal, MONGODB should go online and start listening to any interactions with it.
		you shall need to keep it open for the duration of when youre using the website.






-------------------------------------     SETTING UP MONGODB AND POPULATING IT WITH DATA --------------------------------

- this is the part where we populate my database "sembFrags" with the products.

- In this part I set up two options:
	 1. An easy auto method where you just run a script that populates the database automatically to save so much time.
	 2. the normal method of MONGOSH where you copy paste mongo commands into mongo shell 

	 3. the file is in this location below -- start looking from the project folder you unzipped
	 			ISAAC_SSEMBUUSI_24118388 _DELVERABLE2_MERN_STACK\Server_Back_End\sembFrags DB jsons\sembFrags MONGODB CREATION COMMANDS.txt"


OPTION A: EASY METHOD 

	( iam just hoping it works to simplify work for my assessor )
	
	- an easy auto population method with a script i made in a js file.

	HOW TO RUN AUTOMATIC DATABASE POPULATION
		open the server side folder in VS code so that its terminal points to the server side directory

		run the command --->    node autoPopulateMyDatabase.js 

		the script should auto populate the database

		at the end of it should send you a success message


	---------------------------------------------- incase the operation is a sucess youll see these messages
		Connected to MongoDB
		Current collection counts: { users: 0, categories: 0, products: 0 }
		Data inserted into users collection
		Data inserted into categories collection
		Data inserted into products collection
	--------------------------------------------------




		i set it such that if you ever run it again it will count the original data i set it to count and it wont run
		incase you accidentally run it again

		-------------------------------- thats what the original data in my database is supposed to be
		Connected to MongoDB
		Current collection counts: { users: 1, categories: 4, products: 31 }
		Collections already contain the expected number of documents. No need to populate.
		-------------------------------------------------




	

		if it fails for some reason, PLEASE USE OPTION B OF PASTING COMMANDS INTO MONGO SHELL


OPTION B: MONGO SHELL METHOD ( USE ONLY IF OPTION A REFUSED TO WORK  )

	get the commands text file at the location below:
		ISAAC_SSEMBUUSI_24118388 _DELVERABLE2_MERN_STACK\Server_Back_End\sembFrags DB jsons\sembFrags MONGODB CREATION COMMANDS.txt"

	that file has commands that will create the database ( sembFrags ), user, categories and products.

	copy and paste each command till the end ( they arent so many ).


from here the application is ready to be run



RUNNING THE APPLICATION ----------------------------------------

you will need to start both the front and back end

	open the Server_Back_End folder and Client_Front_End folder in two different VS codes

	start the back end first

	in the Server_Back_End VS code terminal, RUN THE COMMAND   ------>   nodemon index.js
		the nodemon is already in the dependencies
		if you run npm install earlier it should be there already
		this should start the back end server

	start the front end after the back end
	in the Client_Front_End VS code terminal, RUN THE COMMAND   ------>   npm start

		this should start the front end server AND will automatically start the website in a browser

		if not, type this in your browser --->    http://localhost:3000/


--------LOGGING IN -----------------------

in my humble opinion it was pointless to set up an initial user, since we set up a function for signing up

but regardless i set up a sample user


--------------------------- USER CREDENTIALS FOR SOMAPLE USER ---------------------------------
		email: johndoe@mail.com
		password: 123

BUT YOU CAN CREATE YOUR OWN ACCOUNT AND TEST OUT THAT FUNCTIONALITY TOO 


for any inquiries, you can reach me at 

Isaac.Ssembuusi@mail.bcu.ac.uk
isaacsemb1996@gmail.com
+44-7570-259-725


------------------------------ THE END ---------------------------------------

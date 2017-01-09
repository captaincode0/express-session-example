/* package whatever; // don't place package name! */

import java.util.*;
import java.lang.*;
import java.io.*;

/**
 * @author captaincode0
 * @version 0.0.0.1
 */

/**
 * @class: DatabaseConfigurator.
 * @desc: represents the configuration of the database.
 */
class DatabaseConfigurator{
	private String user;
	private String pass;
	private String host;
	private String database;
	
	public DatabaseConfigurator(String user, String pass, String host, String database){
		this.user = user;
		this.pass = pass;
		this.host = host,
		this.database = database;
	}
	
	public DatabaseConfigurator(){}
	
	public String getUser(){
		return this.user;
	}
	
	public void setUser(String user){
		this.user = user;
	}
	
	public String getPass(){
		return this.pass;
	}
	
	public void setPass(String pass){
		this.pass = pass;
	}
	
	public String getHost(){
		return this.host;
	}
	
	public void setHost(String host){
		this.host = host;
	}
	
	public String getDatabase(){
		return this.database;
	}
	
	public void setDatabase(String database){
		this.database = database;
	}

	@Override
	public String toString(){
		return "[+] Connection info: {user: "+this.user+", pass: "+this.pass+", host:"+this.host+", database:"+this.database;
	}
}

/**
 * @class: DatabaseConnection.
 * @desc: class that represents a database connection.
 */
class DatabaseConnection{
	public void print(){
		System.out.println("I am one connection!!!");
	}
}

interface IRegistrable{}

/**
 * @class: DatabaseController.
 * @desc: abstract class to be implemented on the controllers.
 */
abstract class DatabaseController implements IRegistrable{
	protected DatabaseConfigurator databaseConfigurator;
	protected String controllerName;
	protected String instanceName;

	public DatabaseController(DatabaseConfigurator databaseConfigurator){
		this.databaseConfigurator = databaseConfigurator;
		this.instanceName = instanceName;
		//for names mysql-backup, mysql-main
		this.instanceName = this.controllerName+"-"+this.instanceName;
	}

	@Override
	public String toString(){
		return this.instanceName;
	}

	public abstract Object connect();
	public abstract boolean close();
}

interface IRegisterService{
	public void register(IRegistrable controller);
}

class DatabaseControllerRegister implements IRegisterService{
	private ArrayList<DatabaseController> controllers;

	public DatabaseControllerRegister(){
		this.controllers = new ArrayList<>();
	}

	@Override
	public void register(IRegistrable controller){
		//downcasting of IRegistrable type to DatabaseController
		controller = (DatabaseController) controller;

		//add the controller
		this.controllers.add(controller);
	}

	public DatabaseController get(String instanceName){
		int size = this.controllers.size();
		DatabaseController tmpcontroller = null;

		if(size != 0){
			boolean controllerexists = false;

			for(int i=0; i<size; i++){
				tmpcontroller = this.controllers.get(i);

				if(tmpcontroller.instanceName == instanceName){
					controllerexists = true;
					break;
				}
			}

			if(!controllerexists)
				tmpcontroller = null;
		}

		return tmpcontroller;
	}
}

/**
 * @class: MySQLDatabaseController.
 * @desc: mysql controller to connect and disconnect from mysql.
 */
class MySQLDatabaseController extends DatabaseController{
	public MySQLDatabaseController(DatabaseConfigurator databaseConfigurator, String instanceName){
		super(databaseConfigurator);
		this.controllerName = "mysql";
	}

	@Override
	public Object connect(){
		System.out.println("[+] Openning connection");
		System.out.println("[+] Instance: "+this.instanceName):
		DatabaseConnection connection = new DatabaseConnection();
		return connection;
	}

	@Override
	public boolean close(){
		System.out.println("[+] Closing connection");
		System.out.println("[+] Instance: "+this.instanceName);
		return true;
	}
}

/**
 * @class: PostgreSQLDatabaseController.
 * @desc: postgre sql controller to connect and disconnect from postgre.
 */
class PostgreSQLDatabaseController extends DatabaseController {
	public PostgreSQLDatabaseController(DatabaseConfigurator databaseConfigurator, String instanceName){
		super(databaseConfigurator);
		this.controllerName = "pgsql";
	}

	@Override
	public Object connect(){
		System.out.println("[+] Openning connection");
		System.out.println("[+] Instance: "+this.instanceName):
		DatabaseConnection connection = new DatabaseConnection();
		return connection;
	}

	@Override
	public boolean close(){
		System.out.println("[+] Closing connection");
		System.out.println("[+] Instance: "+this.instanceName);
		return true;
	}
}

/**
 * @class: RedisDatabaseController.
 * @desc: redis database instance.
 */
class RedisDatabaseController extends DatabaseController {
	public RedisDatabaseController(DatabaseConfigurator databaseConfigurator, String instanceName){
		super(databaseConfigurator);
		this.controllerName = "redis";
	}

	@Override
	public Object connect(){
		System.out.println("[+] Openning connection");
		System.out.println("[+] Instance: "+this.instanceName):
		DatabaseConnection connection = new DatabaseConnection();
		return connection;
	}

	@Override
	public boolean close(){
		System.out.println("[+] Closing connection");
		System.out.println("[+] Instance: "+this.instanceName);
		return true;
	}
}

/**
 * @interface: ISysEntity.
 * @desc: this interface is implemented in subclases to give a type.
 */
interface ISysEntity{}

/**
 * @class: Player.
 * @desc: player entity.
 */
class Player implements ISysEntity{
	private String name;
	private short level;
	private float points;
	
	public Player(String name, short level, float points){
		this.name = name;
		this.level = level;
		this.points = points;
	}
	
	public Player(){
		
	}
	
	public String getName(){
		return this.name;
	}
	
	public void setName(name){
		this.name = name;
	}
	
	public short getLevel(){
		return this.level;
	}
	
	public void setLevel(short level){
		this.level = level;
	}
	
	public float getPoints(){
		return this.points;
	}

	public void setPoints(float points){
		this.points = points;
	}

	@Override
	public String toString(){
		return "name: "+this.name+", level:"+this.level+", points:"+this.points;
	}
}

/**
 * @interface: IModelOperations.
 * @desc: describes the model operations.
 */
interface IModelOperations{
	public boolean add(ISysEntity entity);
	public boolean edit(ISysEntity entity);
	public boolean delete(ISysEntity entity);
	public ArrayList getAll();
}

/**
 * @class: PlayerModel.
 * @desc: The model of player entities.
 */
class PlayerModel implements IModelOperations{
	private DatabaseController databaseController;

	public PlayerModel(DatabaseController databaseController){
		this.databaseController = databaseController;
	}

	public DatabaseController getDatabaseController(){
		return this.databaseController;
	}

	public void setDatabaseController(DatabaseController databaseController){
		this.databaseController = databaseController;
	}
	
	@Override
	public boolean add(ISysEntity entity){
		//downcasting of entity
		entity = (Player) entity;
		System.out.println("[+] Adding user to database");
		System.out.println(entity);
		return true;
	}

	@Override
	public boolean edit(ISysEntity entity){
		entity = (Player) entity;
		System.out.println("[+] Editing player from database");
		System.out.println(entity);
		return true;
	}

	@Override
	public boolean delete(ISysEntity entity){
		entity = (Player) entity;
		System.out.println("[+] Deleting player from database");
		System.out.println(entity);
		return true;
	}

	@Override
	public ArrayList getAll(){
		Player p1 = new Player("player1", 100, 150999.354789);
		Player p2 = new Player("player2", 1000, 1000099.9964658);

		ArrayList<Player> playerList = new ArrayList<>();
		playerList.add(p1);
		playerList.add(p2);

		return playerList;
	}
}

/**
 * @class: PlayerController.
 * @desc: this is a simple controller for player view UI.
 */
class PlayerController{
	private PlayerModel model;
	private String message;

	public PlayerController(PlayerModel model){
		this.model = model;
	}

	public PlayerController(){

	}

	public PlayerModel getModel(){
		return this.model;
	}

	public void setModel(PlayerModel model){
		this.model = model;
	}

	public String getMessage(){
		return this.message;
	}

	public void add(Player player){
		if(this.model.add(player))
			this.message = "[+] User added succesfuly";
		else
			this.message = "[+] User wasn't added succesfuly";
	}

	public void edit(Player player){
		if(this.model.edit(player))
			this.message = "[+] User edited succesfuly";
		else
			this.message = "[+] User wasn't edited succesfuly";
	}

	public void delete(Player player){
		if(this.model.delete(player))
			this.message = "[+] User deleted succesfuly";
		else
			this.message = "[+] User wasn't edited succesfuly";
	}
} 

interface JFrame{
	public void click(String action);
	public void run();
}

class ModuleConfigurator{
	//database controllers register
	private DatabaseControllerRegister cregister;

	//player model
	private PlayerModel playerModel;

	//player controller
	private PlayerController playerController;

	public final void configure(){
		//configure the database connections
		
		//mysql instance: mysql-backup
		MySQLDatabaseController backupmysqldb = new MySQLDatabaseController(new DatabaseConfigurator("root", "1234", "localhost", "shop-backup"), "backup");
		PostgreSQLDatabaseController postgregeodb = new PostgreSQLDatabaseController(new DatabaseConfigurator("pgadmin", "1234567898", "localhost", "shop"), "shop");
		RedisDatabaseController redisdb = new RedisDatabaseController(new DatabaseConfigurator("root", "admin", "localhost", "shop-alerts"), "shop-alerts");

		this.cregister.register(backupmysqldb);
		this.cregister.register(postgregeodb);
		this.cregister.register(redisdb);

		//creates the player model and gets the controller to connect to backup database in mysql instance service
		this.playerModel = new PlayerModel(this.cregister.get("mysql-backup"));
		this.playerController = new PlayerController(this.playerModel);
	}

	public DatabaseControllerRegister getControllerRegister(){
		return this.cregister;
	}

	public PlayerModel getModel(){
		return this.playerModel;
	}

	public PlayerController getViewController(){
		return this.playerController;
	}
}

/* Name of the class has to be "Main" only if the class is public. */
class PlayerView implements JFrame{
	private ModuleConfigurator configurator;

	public PlayerView(){
		System.out.println("[+] Building player view");

		//building the configurator
		this.configurator.configure();
	}

	@Override
	public void click(String action){
		Player p = new Player("diego", 10000, 1354789.2465464);
		PlayerController controller = this.configurator.getViewController();

		switch(action){
			case "add":
					controller.add(p);
				break;
			case "edit":
					controller.edit(p);
				break;
			case "delete":
					controller.delete(p);
				break;
			default:
				System.out.println("[-] Option not found");
				break;
		}

		System.out.println(controller.getMessage());
	}

	@Override
	public void run(){
		this.click("add");
		this.click("edit");
		this.click("delete");
	}

	public final static void name(String[] args){
		JFrame playerView = new PlayerView();
		playerView.run();
	}
}
"use strict"

//require sqlite3 library
var sqlite3 = require("sqlite3").verbose();

class DatabaseController{
	/**
	 * [constructor initialize dbfile parameter]
	 * @param  {string} dbfile [database file path]
	 * @return {void}
	 */
	constructor(dbfile){
		this.dbfile = dbfile;
		this.db = null;
	}

	/**
	 * [connect | this methodopens a database connection and gets the object]
	 * @return {[SQLiteDatabase]} [an sqlite database if was builded correctly | if returns null the database connection couldn't be opened]
	 */
	connect(){
		try{

			//open a new connection to the database
			this.db = new sqlite3.Database(this.dbfile, sqlite3.OPEN_READWRITE, function(error){
				if(!error)
					console.log("[+] Database opened correctly");
				else{
					console.log("[+] Database can't be opened correctly");
					console.log(error);
				}
			});

		}
		catch(ex){
			console.log(ex);
		}
		finally{
			return this.db;
		}
	}

	/**
	 * [close | this method closes the current database connection]
	 * @return {void} 
	 */
	close(){
		try{
			if(this.db){
				this.db.close(function(error){
					if(!error)
						console.log("[+] Database closed correctly.");
					else{
						console.log("[-] The database was not closed correctly.");
						console.log(error);
					}
				});
			}
			else
				throw new Error("The database connection can't be closed");
		}
		catch(ex){
			console.log(ex);
		}
	}
}

module.exports = DatabaseController;
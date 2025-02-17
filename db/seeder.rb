require 'sqlite3'

class Seeder

  def self.seed!
    drop_tables
    create_tables
    populate_tables
  end

  def self.drop_tables
    db.execute('DROP TABLE IF EXISTS users')
    db.execute('DROP TABLE IF EXISTS stats')
  
  end
  def self.create_tables
  
    db.execute('CREATE TABLE users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      password TEXT NOT NULL,
      balance INTEGER 
    )')

    db.execute('CREATE TABLE stats (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      chans INTEGER NOT NULL 
    )')
  end


  def self.populate_tables
    db.execute('INSERT INTO users(username, password, balance) VALUES("admin", "admin", 10000)')
    db.execute('INSERT INTO users(username, password, balance) VALUES("user", "user", 10000)')

    db.execute('INSERT INTO stats(name, chans) VALUES("apple", 250)')
    db.execute('INSERT INTO stats(name, chans) VALUES("grape", 450)')
    db.execute('INSERT INTO stats(name, chans) VALUES("lemon", 600)')
    db.execute('INSERT INTO stats(name, chans) VALUES("cherry", 725)')
    db.execute('INSERT INTO stats(name, chans) VALUES("melon", 825)')
    db.execute('INSERT INTO stats(name, chans) VALUES("pinapple", 900)')
    db.execute('INSERT INTO stats(name, chans) VALUES("wild", 1000)')

  end
  
  private
  def self.db
    return @db if @db
    @db = SQLite3::Database.new('db/todos.sqlite')
    @db.results_as_hash = true
    @db
  end

end

Seeder.seed!


require 'sinatra'
require 'securerandom'
require 'bcrypt'
require 'rack-flash'



class App < Sinatra::Base

    configure do
        enable :sessions
        set :session_secret, SecureRandom.hex(64)
        use Rack::Flash
    end
    
    def db
        return @db if @db
  
        @db = SQLite3::Database.new("db/todos.sqlite")
        @db.results_as_hash = true
  
        return @db
    end

    get '/' do
        redirect'/login'
    end

    get '/slot' do
        redirect '/login' if session[:user].nil?
        @stats= db.execute('SELECT chans FROM stats')
        @balance = session[:user]['balance']
        
        erb(:"index")
    end

    get '/login' do
        if !session[:user]
            erb(:login)
        else
            redirect('/slot')
        end
    end


    post '/login' do 
        user = db.execute('SELECT * FROM users WHERE username=?',[params[:username]]).first

        if user &&BCrypt::Password.new(user['password'])== params[:password]
            session[:user] = user
        else
            status 401
            flash[:error] = 'Wrong username or password'
        end
  
        redirect('/login')
    end


    get '/register' do
        erb(:register)
    end

    get '/logout' do
        session[:user] = nil
        redirect('/login')
    end
    

    post '/register' do 
        user = db.execute('SELECT * FROM users WHERE username=?',[params[:username]])

        if user.empty?
          
            bcrypt_password= BCrypt::Password.create(params[:password])
           db.execute('INSERT INTO users(username, password, balance) VALUES(?, ?, 0)',  [params[:username] , bcrypt_password])  

        end
        redirect('/login')
    end

    post '/updateBalance' do
        content_type :json
        request_payload = JSON.parse(request.body.read)
        user = db.execute('SELECT * FROM users WHERE id=?', [session[:user]["id"]]).first
        balance = user['balance'] + request_payload["winamount"] - request_payload["bet"]
        
    
        if user 
            db.execute('UPDATE users SET balance = ? WHERE id = ?', [balance, session[:user]["id"]]) 
            { success: true, message: "Balance updated", balance: balance }.to_json
        else
            { success: false, message: "User not found" }.to_json
        end

    end




end

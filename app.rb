
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
    

end

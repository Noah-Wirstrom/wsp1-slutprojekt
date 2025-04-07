
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
        @jackpots = db.execute('SELECT * FROM jackpots')
        
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

    get '/account/:id' do |id|
        if session[:user]
            @history= db.execute('SELECT * FROM history WHERE user_id=?',[session[:user]["id"]])
            p(@history)
            erb(:account)
        else
            redirect('/login')
        end
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
            db.execute('INSERT INTO history (user_id, win_amount) VALUES(?, ?)', [user["id"], request_payload["winamount"] - request_payload["bet"]])
        else
            { success: false, message: "User not found" }.to_json
        end

    end

    post'/change_stats' do

        statheart_tot=(params[:statheart]).to_i+(params[:statcross]).to_i
        statstar_tot= statheart_tot+ (params[:statstar]).to_i
        statcloud_tot= statstar_tot+ (params[:statcloud]).to_i
        statwing_tot=  statcloud_tot+ (params[:statwing]).to_i
        statnun_tot= statwing_tot+ params[:statnun].to_i

    

        db.execute('UPDATE stats SET chans = ?  WHERE id = 1',[params[:statcross]])
        db.execute('UPDATE stats SET chans = ?  WHERE id = 2',[statheart_tot])
        db.execute('UPDATE stats SET chans = ?  WHERE id = 3',[statstar_tot])
        db.execute('UPDATE stats SET chans = ?  WHERE id = 4',[statcloud_tot])
        db.execute('UPDATE stats SET chans = ?  WHERE id = 5',[statwing_tot])
        db.execute('UPDATE stats SET chans = ?  WHERE id = 6',[statnun_tot])
        redirect('/slot')
    end


    get '/jackpot/:id' do |id|
        if session[:user]
            jackpot = db.execute('SELECT * FROM jackpots WHERE id = ?', [id]).first
            if jackpot
                db.execute('INSERT INTO jackpot_to_user(user_id, jackpot_id) VALUES (?, ?)',[session[:user]["id"], id])
                db.execute('UPDATE jackpots SET value = ? WHERE id = ?', [jackpot["value"] + 1, id])
            end
            redirect('/slot')
        else
            redirect('/login')
        end
    end 

end




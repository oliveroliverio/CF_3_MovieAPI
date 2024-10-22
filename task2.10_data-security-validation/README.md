# Learning Goals
- Modify API to align with data security regulations
- Deploy API to online hosting service
- Deploy database to cloud-based database hosting platform

# Intro

Congratulations! You’ve reached the final Exercise in Achievement 2 of your Full-Stack Immersion course. Throughout this Achievement, you’ve added an entirely new repertoire to your bank of coding knowledge, learning how to go beyond the frontend, or client-side, of your application to create databases and server-side scripts in the backend. You now have a complete REST API you can call your own, along with a non-relational database in which to store the data for your app. Pretty cool!

In the next Achievement, you’ll learn how to create the frontend for your new myFlix app using nothing but JavaScript UI frameworks, which will give you a complete app, frontend and backend, and coded from scratch, that you’ll be able to add to your portfolio.

Before moving on, there’s one final step to look into, which is one you should never omit from the development process—ensuring data and web security considerations have been incorporated into your product and that you’re fulfilling your ethical responsibilities as a web developer. You’ve likely already heard a great deal about data breaches in the news, for instance, the Equifax data breach of 2017, in which 145 million customers’ personal data (including some credit card data) was stolen; or, the Cambridge Analytica scandal of 2018, where a British consulting firm was discovered to have used the data from millions of Facebook users’ personal profiles for political purposes.

Clearly, cybersecurity is a major concern. There will always be malicious entities trying to breach the security of web applications or websites that store data. In a world where technical fluency is on the up-and-up, how can you keep your applications safe? It’s the duty of developers to design and build applications that are not only secure but ethically responsible.

In the previous Exercise, you learned all about authentication and authorization—the most basic gateways through which content can be made accessible in web applications; however, there’s no such thing as foolproof security. Multiple layers of security have become the necessity, ensuring that even if one method is breached, there’s always a backup.

Think of this a bit like cars. When you go for a drive, you use both seatbelts and airbags: neither is guaranteed to protect you one hundred percent in the case of a car accident, but both combined are more likely to keep you safe. So, too, do you need to think in terms of multiple protection mechanisms when it comes to keeping your applications safe.

In this Exercise, you’ll dive first into privacy laws and how you can use a basic ethical framework for making decisions about privacy and data protection for your apps. Then, you’ll continue on into security mechanisms for the web, including the Same-Origin Policy and CORs, HTTPS and encryption, and password hashing. Finally, you’ll explore methods of incorporating input validation into your app on the server-side to protect your application and its users. You’ll wrap things up by researching hosting options for your API—which is what will allow your API to go public. Sound exciting? Then, let’s get started!

# Privacy Law and Ethics
Let’s begin by taking a look at some ethical and legal guidelines pertinent to building web applications. In April 2016, in response to widespread concern about data privacy on the internet and what big companies are doing with users’ data, the European Union passed the General Data Protection Regulation (GDPR), which pertains to the processing of personal data of users within the EU (as well as regulations for companies based in an EU country, even if their users are outside the EU). While the GDPR regulations are EU based, it has become somewhat of an international standard for most application developers. Since the protections are for EU users in general, a company beyond the EU may still fall under the regulation’s scope. For example, imagine European users of a US-based ecommerce, social media, or travel application. The fines for not adhering to the regulations are steep enough that most companies in the US, for example, have adopted the standards to be on the safe side.

As a developer, it’s important that you understand privacy law and how it might affect the products you develop, not only as a purely legal matter, but also in terms of ethicality (i.e., creating products that help rather than hurt). You can use the GDPR as a framework for handling user data in all your products, no matter where they’re located.

In an ideal world, product managers would be in charge of making sure their products deal with data in a legal and ethical way, and developers would only be in charge of implementation. More often than not, however, these roles become blurred, making it the job of the developer to voice their concerns if they think a product is asking for unnecessary data, is collecting data without properly informing the user, or is lacking sufficient security. With that in mind, let’s go over the six general principles outlined in the GDPR:

## 1. Lawfulness, Fairness, and Transparency

> “Lawfulness,” here, simply means that all data must be in accordance with the guidelines of the GDPR. “Fairness” means that data must be collected truthfully and in good faith. “Transparency” refers to keeping users informed when and for what purposes their data is being collected. Mostly what this comes down to is displaying messages, similar to the one below, whenever you use cookies as part of your site or app:

Two axioms that arguably fall under this are the **right to access**, which means that once a user provides their data, they should always have access to it upon request, and the **right to erasure**, which means that a user has the right to ask for their data to be erased.

## 2. Purpose Limitation
Organizations should only collect data for a specified, limited, and legitimate purpose. In other words, a company can’t say it’s collecting data for one thing (e.g., to populate a social network profile) but actually be collecting it for another purpose (e.g., to provide consulting firms) without explicitly informing its users.

## 3. Data Minimization
Organizations shouldn’t collect more data than they need to meet their stated purposes. This ensures malicious entities can’t acquire extraneous information upon breaching your application’s security. It also makes it easier to maintain accurate data.

## 4. Accuracy
All data should be up-to-date and accurate, and organizations should take reasonable steps to erase or rectify inaccurate data (e.g., by prompting users to update their data).

## 5. Storage Limitation
Similarly, organizations shouldn’t retain personal user data any longer than is absolutely required. Data should be consistently reviewed to ensure its necessity. This also helps to keep data accurate.

## 6. Integrity and Confidentiality
This guideline revolves around keeping data secure and confidential (i.e., not accessible by malicious entities). This is also what the rest of this Exercise will concern itself with. Keeping data secure usually involves encryption methods, which can protect data even if it’s stolen.

Now that you’ve had a look at some crucial guidelines for receiving and storing data within your application, let’s explore a few of the security mechanisms that are already in place, followed by those you can implement yourself to ensure protection of your application and its users.

# The Same-Origin Policy
In this section, you’ll look into how you as a developer can keep your applications safe from malicious software, more specifically, by restricting domain access. But before exploring methods you can implement yourself, it’s important that you know what precautions are already in place—namely, the same-origin policy.

The **same-origin policy** is a feature within browsers that restricts cross-origin HTTP `GET` requests, in other words, `GET` requests from a different domain (or “origin”)

Note: there are other measures to block cross-origin `POST`, `PUT`, and `DELETE` requests, but you’ll be exploring those later in this Exercise.

A website can additionally apply the same-origin policy to cookies and local data that it stores in the browser. By restricting this by default, browsers prevent any local data you’re storing (i.e., cookies) from being exposed to malicious websites. Why is this a good thing?

Well, let’s say you’re logged into Facebook. In order to be logged into Facebook, your browser needs to be storing Facebook cookies that contain your Facebook login information. While still logged in, you happen to navigate to a malicious website in a different tab of your browser. If there were no same-origin policy, that malicious website would have access to your Facebook cookies. Not only would it have access to your personal data, but it could also use that data (i.e., your username and password) to make requests to Facebook on your behalf, perhaps posting on your timeline, sending a message to your contacts, changing your privacy settings, or conducting other unwanted activity.

This sounds bad enough, but imagine, now, how this could pose even greater problems on other kinds of sites, for instance, your online banking portal. If a malicious website had access to cookies from your banking portal, it could access your online banking details and even transfer funds from your account.

Fortunately, however, the same-origin policy exists, meaning this kind of unwanted activity is prevented. This policy keeps your cookies away from malicious sites that would try to benefit from your personal information.

Unless otherwise specified, if you make a `GET` request from one domain to another domain, you’ll receive an error that looks something like this:

>No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin '...' is therefore not allowed access.

While the same-origin policy is perfect for protecting users on the web, it does create a few unwanted problems when it comes to working with APIs. By restricting requests from one domain to another, it also prohibits domains from making requests to APIs on a different server (i.e., with a different origin/domain). For instance, think of a real-estate website. Oftentimes, these types of websites will load maps of houses by making requests to the Google Maps API; under the same-origin policy, these types of requests would be restricted, as the Google Maps API is located on a different domain/origin (“maps.google.com”) than the real-estate website.

You may be wondering why you haven’t experienced any problems when creating and testing your API, and that’s because you’ve only been making requests from your local domain (the domain labeled “localhost”). As your API is also hosted on your local domain, there’s no change in origin; thus, these requests aren’t restricted. If, however, you were to host your API on one domain and the frontend of your application on another, things would quickly become a lot more complicated. Likewise, if your API were hosted at “myflix.com,” and web pages from other applications started making API requests to your API, they’d experience their own issues.

All of this sounds like it would be a bit counter-productive, as applications frequently need to make requests to APIs from different providers (i.e., the real estate website mentioned above). Fortunately, there’s a solution!

# Cross-Origin Resource Sharing (CORS)

The answer to these potentially pesky cross-origin restrictions is “Cross-Origin Resource Sharing,” otherwise known as CORS. What CORS does is extend HTTP requests, giving them new headers that include their domain. The receiving server can then identify where the request is coming from and allow or disallow the request from going through. The header for one of these cross-domain requests would look something like this:

`Origin: [domain]`

When the server receives this request, it checks whether the included domain is allowed, then sends back an HTTP response with a new header of its own, indicating that the requesting domain was permitted:

`"Access-Control-Allow-Origin:  [list of permitted domains or a wildcard for all domains]"`

For example, if an HTTP request were sent to a server from “test.com,” the server’s response could include either an asterisk, which allows access from all domains:

Access-Control-Allow-Origin: *
Or, a list of specifically allowed domains, for instance:

`Access-Control-Allow-Origin: https://www.test.com http://www.test.com https://site.mdn.net http://site.mdn.net https://static.sitename.net http://static.sitename.net`

But what does this mean for your myFlix API? Well, CORs allows you to control which domains have access to your API’s server. By controlling who has access to your API, you can keep it protected from malicious entities. This means that even if your frontend and API are hosted at different domains, the frontend will still be able to make requests to the API—all you have to do is list the origin for your frontend as an authorized domain.

All in all, CORs will be a great help in getting each part of your app up and running (and working politely with its counterparts), so let’s take a look at how you’d go about implementing it. It’s time to pay a visit to your old friend, Express!

## CORS in Express

As your myFlix app was built using the MERN stack, you’ll need to implement CORS by way of Express (the “E” in “MERN”). Do note, however, that CORS can be integrated into any application regardless of the tech stack used.

You can quickly and easily integrate CORS into your myFlix API via the cors module. More information can be found in the npm CORS package registry entry, but for now, let’s go ahead and simply install it. To do so, run the following command in your terminal:

`npm install cors`

Once installed, you’ll need to include the following code in your “index.js” file in order to use CORS within your application. Make sure to add it right before `let auth = require('./auth')(app)`; and ensure that it’s before any route middleware:

```
const cors = require('cors');
app.use(cors());

/* rest of code goes here*/
```




The above code specifies that your app (defined elsewhere in the file by `const app = express();`) uses CORS. By default, it will set the application to allow requests from all origins; however, if you want only certain origins to be given access, you’ll need to replace app.use(cors()); with the following code:

```js
let allowedOrigins = ['http://localhost:8080', 'http://testsite.com'];

app.use(cors({
  origin: (origin, callback) => {
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){ // If a specific origin isn’t found on the list of allowed origins
      let message = 'The CORS policy for this application doesn’t allow access from origin ' + origin;
      return callback(new Error(message ), false);
    }
    return callback(null, true);
  }
}));
```
The above code creates a list of allowed domains within the variable `allowedOrigins`, then compares the domains of any incoming request with this list and either allows it (if the domain is on the list) or returns an error (if the domain isn’t on the list).

As a general rule, you should only allow requests from domains that need your API. For instance, if your application’s frontend were hosted separately from the API, you’d want to ensure the domain hosting your frontend was granted access. The fewer domains that have access to your API, the more secure it (and the data it provides access to) will be. For this reason, it’s usually considered bad practice to use an asterisk * to grant access to all domains.

# HTTPS and SSL

Now that you know how to restrict and allow access to your API from different domains/origins, let’s take a look at another security measure you can take to protect your applications and the users that interact with them: HTTPS. When you browse sites on the internet, you may have noticed that some websites use the prefix “http”, while others use the prefix “https”. In fact, sometimes when you try to open a site using the “http” prefix, you’ll be automatically redirected to a version of the site that uses the “https” prefix. The CareerFoundry web application you’re using right now even prevents users from opening links that lead to “http” domains.

What’s this “https” business all about? Well, it all started because communication over regular “http” connections wasn’t secure. Normal “http” requests are sent in plain text format—in other words, unencrypted text. If a malicious entity were to intercept them, they’d have complete access to all of the information contained within. This is especially dangerous in public WiFi spaces such as airports and coffee shops, where persons of nefarious intent can more easily intercept these requests, putting any data you might fill in on websites (credit card information, your name and address, etc.) at risk.

With the “https” prefix, messages sent between the browser and the domain are encrypted using a security protocol called Secure Sockets Layer, or SSL. Requests that have been encrypted using SSL can’t be read without an encryption key. This keeps any data inside safe from prying eyes, even if the requests themselves happen to be intercepted. An SSL certificate is required to create an SSL connection. Oftentimes, if you host your website or web application on a server, the hosting provider will include (for a price) an SSL certificate as part of its hosting package. Registering one requires information about the identity of your website and your company.

When the SSL certificate is created, two cryptographic keys (i.e., codes used for encryption) are also created: a private key and a public key.

Whenever you open an “https” website in your browser (e.g., “https://www.amazon.com”), the first thing your browser does is look up the domain of the website to obtain its IP address. Next, your browser will attempt to establish a secure connection to the website by requesting a copy of the website’s SSL certificate; if received, your browser will review said SSL certificate to ensure it’s been signed by a trusted issuer, that it hasn’t expired, that it conforms to required security standards, and that it matches the domain of the requested website. The SSL certificate will contain its public key—a publicly accessible piece of information used to encrypt any data being sent to the website.

When the browser confirms that the website can be trusted, it creates a second key called a “symmetric session key.” It then uses the public key to encrypt the session key, before sending along the session key in its request to the web server. The web server then uses its private key to decrypt the session key, before sending back an acknowledgement to the client. All future communication between the client and server will thus be encrypted using the session key (which only the client and the web server have, since the session key itself was encrypted), ensuring that the connection is secure. The initial process of establishing this connection is somewhat humorously referred to as the “SSL handshake.”

Your myFlix application is currently hosted locally, so you won’t need to register an SSL certificate for it; however, once you decide to host your app online, you need to keep in mind the importance of HTTPS and SSL, especially for websites and applications that collect sensitive data (e.g., financial and medical information).

# Hashing

So far in this Exercise, you’ve heard a lot about encryption, for instance, encrypting data traveling between a browser and a web server. But what does that mean? Encryption is the process of turning data into a series of unreadable characters, which can then be decrypted, or reversed back to their original form, by way of a key. This ensures data can only be read by those with the proper permission (i.e., those with the key).

Hashing, on the other hand, is the process of turning data into a string of text or numbers that (with a good hashing algorithm) can’t be turned back into the original string. Once the data has been hashed, it’s no longer accessible to anyone. But when would this be useful? After all, what good would data be if it can’t be read or accessed?

There are actually more uses for this than you’d think. For instance, whenever you log in to a website or app, you input your password. This password is usually hashed. When you first register, the password you provide is hashed, then placed into the database on the server. Then, every time you log in, the password you provide is also hashed. This hashed password is compared to the hashed password in the database, and if they match, you’re allowed to log in. This keeps your password data from ever being seen by anyone, even the creators of the app or website. It ensures that, no matter what, no one will ever know your password except you. (This is why you’ll sometimes get warning emails from companies, reminding you that they’ll never ask you for your password, and that any correspondence that does is likely a scam.)

Your myFlix application, too, will allow users to register with a username and password (along with other user information such as an email and birthday). Users then use this same username and password combination every time they log in. In Node.js, you can use a module called bcrypt to hash users’ passwords and compare hashed passwords every time users log in in order to ensure a more secure login authentication process. To install bcrypt, run this command in your terminal:

`npm install bcrypt`

TIP!
If you're having trouble getting bcrypt installed, especially on Ubuntu Linux, try installing bcryptjs instead (simply substitute "bcryptjs" in place of "bcrypt" in the terminal installation command). Make sure you update it in your code, as well!

Import the module into your “models.js” file, as this is where you’ll be using it:

`const bcrypt = require('bcrypt');`

You’ll then need to add the additional two functions to your “Users” schema (beneath the userSchema declaration: `let userSchema = mongoose.Schema({...});`). The first function you’ll want to add is a hashPassword function, which is what does the actual hashing of submitted passwords. The second function, validatePassword, is what compares submitted hashed passwords with the hashed passwords stored in your database.

```js
let userSchema = mongoose.Schema({
  Username: {type: String, required: true},
  Password: {type: String, required: true},
  Email: {type: String, required: true},
  Birthday: Date,
  FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }]
});

userSchema.statics.hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

userSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.Password);
};
```


CAREFUL!

Don't use arrow functions when defining instance methods. `validatePassword` is an example of an instance method, a method that can be called on each object/document created (each individual object/document). Arrow functions bind the this keyword to the object that owns that function, which in this case, is userSchema.methods—not user, even when validatePassword is being called on user within the line: `if(!!user.validatePassword(password)`. Functions defined using the regular way, however, `"function(){...}"` rather than `"() => {...}"`, will always refer to the object where the function has been called on. This is why `validatePassword` in `user.validatePassword(password)` will have its this value (pay attention to this.password in the code above) referring to the actual user document rather than userSchema.methods.

You can learn more about this in the Mongoose documentation. You may also want to learn more about Arrow Functions, particularly, the “What about this?” section.

You’ll next need to adjust the relevant endpoint in the “index.js” file of your REST API. Currently, all POST requests for adding new users to your database must include data about the user—including a password. Thus, you need to modify that endpoint to hash the password before storing it, using the hashPassword function you just added to the model above. Take a look at the code below. The key lines of code you’ll want to focus on are `let hashedPassword`, on the second line, and the new `Password: hashedPassword` line in the `.then` method:

```js
app.post('/users', async (req, res) => {
  let hashedPassword = Users.hashPassword(req.body.Password);
  await Users.findOne({ Username: req.body.Username }) // Search to see if a user with the requested username already exists
    .then((user) => {
      if (user) {
      //If the user is found, send a response that it already exists
        return res.status(400).send(req.body.Username + ' already exists');
      } else {
        Users
          .create({
            Username: req.body.Username,
            Password: hashedPassword,
            Email: req.body.Email,
            Birthday: req.body.Birthday
          })
          .then((user) => { res.status(201).json(user) })
          .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
          });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});
```

In your “passport.js” file, you can then add additional callback code (`} if (!user.validatePassword(password)) { ...`) to LocalStrategy in order to validate any password a user enters:

```js
passport.use(
  new LocalStrategy(
    {
      usernameField: 'Username',
      passwordField: 'Password',
    },
    async (username, password, callback) => {
      console.log(`${username} ${password}`);
      await Users.findOne({ Username: username })
      .then((user) => {
        if (!user) {
          console.log('incorrect username');
          return callback(null, false, {
            message: 'Incorrect username or password.',
          });
        }
        if (!user.validatePassword(password)) {
          console.log('incorrect password');
          return callback(null, false, { message: 'Incorrect password.' });
        }
        console.log('finished');
        return callback(null, user);
      })
      .catch((error) => {
        if (error) {
          console.log(error);
          return callback(error);
        }
      })
    }
  )
);
```

Thus, when combined, the two snippets of code above (the one in your POST endpoint and the one in your “passport.js” file):

1. Hash any password entered by the user when registering before storing it in the MongoDB database (`Users.hashPassword(req.body.Password`) in your POST endpoint).
2. Hash any password entered by the user when logging in before comparing it to the password stored in MongoDB (user.validatePassword(password)) in `LocalStrategy` within your “passport.js” file).

It’s important to note that the users you’ve entered into the database before this code change will no longer be able to log in. As such, you should create new users through the API itself (using Postman) so that the password you send in the request body of the `app.post('/users',...)` endpoint gets hashed before being stored in the database. If you use the mongo shell, you’ll store the original password—not the hashed version of it. This means that when a user tries to log in, the API will hash the password, then compare it with the original password, and the comparison will always fail. On the other hand, if you inserted a user through the API, the password entered in the request body would be hashed and then stored in the database, so that whenever the user tried to log in, the inputted password would be hashed and compared to what’s been stored in the database (comparing a hash to a hash rather than a hash to an original).

# Cross-Site Scripting Attacks (XSS) and Content-Security Policy (CSP)

Now that you’ve looked into a few ways you can keep your users’ data more secure, let’s take a slight turn and explore a few of the reasons you need to keep your users’ data secure, namely, malicious attacks on your site or app. For instance, did you know about a type of attack that can take place on the frontend of your app? This attack, called a cross-site scripting attack, or “XSS attack,” involves the injection of malicious JavaScript code into a website or web application. It takes place on the client-side, in the user’s browser, and can lead to all sorts of pesky problems if allowed to occur.

XSS attacks could include:

- making HTTP requests to another site using your identity (e.g., from your cookies, as mentioned earlier). For example, they could transfer money from your bank account or send spam to your contacts.
- injecting links into a page that direct you to a similar-looking site. This new site could ask you to submit personal and/or financial information, which would then be submitted not to the legitimate site, but straight to the attacker’s database.
- infecting your computer with malware.

There’s a great deal of harm that an XSS attack can cause, especially with how creative they’ve become in recent years. How can you protect yourself and your users against them in your own apps? Well, to start, there are a few measures you can take right within your JavaScript itself:

- Validating user input: This involves checking that all input from users contains only expected characters. Correctly formatted input fields minimize the possibility of malicious code being entered, as it’s not likely a code snippet will be able to pass a more rigid formatting check. You’ll be exploring a few of these techniques later on in this Exercise.
- Escaping data: This involves ensuring all data your app receives is secure before rendering it (i.e., disallowing certain characters, such as < brackets, which can designate script tags and inject JavaScript into a web page).

But there is yet another possibility, similar to the CORs method you learned for restricting domains above. It’s called a “Content-Security-Policy,” or CSP, and it’s attached to the HTTP header of a web page to control which domains your web application allows to load content onto its frontend. By limiting your frontend to trusted domains and their resources, so, too, can you limit the risk of cross-site scripting attacks.

For example, if you were embedding images hosted on a different domain into your site or app, you could configure a CSP to ensure only images from trusted domains could be embedded. Or, if you know that you’re not going to embed any content from a different domain at all, you could restrict all content, only permitting content from the domain your app is hosted on. The code for this would look like:

`Content-Security-Policy: default-src 'self'`

Let’s take a look at how this would work. For lack of a better name, let’s assume a malicious site, “i-am-evil.com,” has a URL that serves a large frontend JavaScript program that automatically installs onto the computer of any user that opens the site. If the user then goes on to visit other sites, this program may use an XSS attack on those sites, causing them to include and execute the JavaScript page.

For instance, say the user visited a page of their online banking system. The program could potentially load onto the bank site, collecting any data that the user enters, such as their name and password. If the bank site had a default-src 'self' policy, however, the browser would refuse to load the external script, as it would have originated from a different domain, thus protecting the user.

CSP is something that doesn’t apply specifically to your myFlix API. Nor does it apply to any specific API, for that matter. This is because CSP applies to client-side development, making it something you need to consider when building the frontend of your myFlix application. There are, however, still some measures you can take on the server-side to protect against XSS—namely, input validation, which you’ll be exploring in just a moment.

## Cross-Site Request Forgery
Another type of attack is called a Cross-Site Request Forgery, or “CSRF,” attack, and it’s when a hacker adopts a user’s identity to perform an action on a website they’re logged into without their consent. Because the web app believes the user is trustworthy (since they’ve already logged in), it will do whatever the hacker tells it to do, which could be anything from posting on their social network feed to transferring funds illicitly. This type of attack can be done using POST, PUT, or DELETE requests.

One way of protecting against CSRF is via a special type of web token called a CSRF token. This token is used to ensure that the requester is safe.

## SQL Injection
Yet another type of attack is called an SQL injection attack. In this type of attack, nefarious SQL statements are provided to an application (e.g., submitted through a form), which can then be used to expose or alter data in the web application. SQL injection attacks can occur if an application doesn’t properly “sanitize” inputs provided by the user, meaning that they don’t strip away anything that could be SQL code. A hacker could, for example, enter SQL code into a form that would instruct the site’s database to return all of its stored usernames and passwords. If the app didn’t validate user input to ensure no SQL code was present, it would be vulnerable.

SQL injection is only a risk for applications running an SQL database in their data layer; however, similar types of attacks can occur with applications using NoSQL databases, as well. As with SQL injection, the best way to address this type of attack is by validating user input on the server-side, only this time, checking for code that’s of the same type as your database. For your myFlix app, you used MongoDB to set up a JSON database, so you’d want to ensure you’re taking precautions against potential JSON attacks. You’ll be setting up server-side validation for your myFlix app in just a minute.

Now that you’ve explored the kinds of security risks your app (and its users) may encounter, it’s time to turn your focus towards preventing such risks, so let’s go ahead and implement a security mechanism into your application: server-side input validation.

# Server-Side Input Validation

Throughout this Exercise, you’ve learned about the importance of validation as a protection mechanism against certain types of attacks, including cross-site scripting and SQL (or other database) injection. Validation is the process of ensuring that anything a user inputs, such as parameters passed to your API endpoints, follows the correct format. By validating inputs, you can minimize the risk of those inputs containing malicious scripts. This acts not only as a security measure, it also prevents bugs, as it ensures you’re only storing expected types of data within your database.

Back in Achievement 1, you first broached validation in the form of real-time form validation—a type of input validation that’s implemented on the client-side using JavaScript. This type of validation is important as a means of giving users feedback (i.e., they can know right away if they need to change something in their input rather than having to wait until they try to submit); however, as a means of securing your application, it’s nowhere near sufficient—attackers can simply alter the frontend code of a web page to bypass this validation mechanism.

Therefore, you need to implement some form of input validation on the server-side, as well. This will ensure only accepted characters and formats make their way into your database. Imagine if a malicious entity made a request to your application’s login endpoint, passing a username of david123<script>[Do something bad]</script>. With no input validation implemented, this username would be accepted and added to your database, where it has the potential to harm your application. You can prevent this by implementing logic that checks for and bans certain characters.

How do you know which characters and formats to allow and which to reject? While there aren’t any hard and fast rules, there are a number of recommended guidelines. For example:

- For usernames, only alphanumeric characters (letters and digits) should be allowed. This prevents inputs like the one above (with the `<script>` tags). Ideally, though, you should still allow non-English characters, such as ë, to accommodate international users of your application.
- For integers, only inputs of the numbers 0 through 9 should be allowed.
- For passwords, all characters should be allowed, but often a minimum character count is required, along with a selection of numbers, lowercase, and uppercase characters..
- For email addresses, there are more complicated rules you can implement, for instance, requiring an @ character and ensuring each part of a normal email address is present (you’ll remember first learning about this back in Exercise 1.7: Complex UI Elements in JS).
- For a date, such as a birthday, you can require it be written in an exact date format, for instance, DD.MM.YYYY

You already learned how to add many of these validation options on the frontend using JavaScript packages (or libraries) in the previous Achievement. Now, let’s look at how you can implement these same validation methods on the backend using Node.js/Express.

## Server-Side Validation for myFlix

There are a number of JavaScript libraries you can use when it comes to adding validation to a Node.js/Express application, but for the purpose of this Exercise, you’re going to be looking into a specific one called “express validator.” The express validator library offers a variety of validation methods for different types of inputted data.

The first thing you’ll need to do, as always, is install the library (it is a package, after all!), so go ahead and type the following into your terminal:

`npm install express-validator`

Then, make sure you import the library into the files that will use it, which, in your case, would be your “index.js” file. Go ahead and require it there:

`const { check, validationResult } = require('express-validator');`

The library will also need to be available within your URL endpoints, which means you’ll need to include your new validator as middleware to the routes that require validation. In use, the validator library takes the following format:

`check([field in req.body to validate], [error message if validation fails]).[validation method]();`

For example, if you wanted to ensure that a user input field called “Username” within the body of an HTTP request contained only alphanumeric characters, you could write:

`check('Username', 'Username contains non-alphanumeric characters - not allowed.').isAlphanumeric()`

The library facilitates a host of different validation methods. A few of the more commonly used ones include notEmpty, which specifies that a field must contain characters; isAlphanumeric, which specifies that a field can only contain letters and numbers; and isEmail, which specifies that a field must be formatted as an email address.

There are also others like:
```js
contains(), //check if value contains the specified value
equals(), //check if value equals the specified value
isAlpha()
isAlphanumeric()
isAscii()
isBase64()
isBoolean()
isCurrency()
isDecimal()
isEmpty()
isFQDN(), //is a fully qualified domain name?
isFloat()
isHash()
isHexColor()
isIP()
isIn(), //check if the value is in an array of allowed values
isInt()
isJSON()
isLatLong()
isLength()
isLowercase()
isMobilePhone()
isNumeric()
isPostalCode()
isURL()
isUppercase()
isWhitelisted(), //checks the input against a whitelist of allowed characters
//check the documentation for more https://express-validator.github.io/docs/validation-chain-api.html
```

Let’s go ahead and take a look at the validator library in action within one of your endpoints, and more specifically, your new user registration endpoint (your POST request to the “/users” endpoint). You’ll notice that the only new thing that’s been added are a few lines of code at the beginning that checks the body of the HTTP request (appropriately called check):

```js
app.post('/users',
  // Validation logic here for request
  //you can either use a chain of methods like .not().isEmpty()
  //which means "opposite of isEmpty" in plain english "is not empty"
  //or use .isLength({min: 5}) which means
  //minimum value of 5 characters are only allowed
  [
    check('Username', 'Username is required').isLength({min: 5}),
    check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
    check('Password', 'Password is required').not().isEmpty(),
    check('Email', 'Email does not appear to be valid').isEmail()
  ], async (req, res) => {

  // check the validation object for errors
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    let hashedPassword = Users.hashPassword(req.body.Password);
    await Users.findOne({ Username: req.body.Username }) // Search to see if a user with the requested username already exists
      .then((user) => {
        if (user) {
          //If the user is found, send a response that it already exists
          return res.status(400).send(req.body.Username + ' already exists');
        } else {
          Users
            .create({
              Username: req.body.Username,
              Password: hashedPassword,
              Email: req.body.Email,
              Birthday: req.body.Birthday
            })
            .then((user) => { res.status(201).json(user) })
            .catch((error) => {
              console.error(error);
              res.status(500).send('Error: ' + error);
            });
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send('Error: ' + error);
      });
  });
```

In the above code, validation logic has been added to a few important fields: username, password, and email. The validation code first ensures that the fields actually contain something (as each field is required); then, it checks that the data within follows the correct format. After these five checkBody functions comes the error-handling function, which puts any errors that occurred into a new variable that’s sent back to the user in a JSON object as an HTTP response:

```js
// check the validation object for errors
let errors = validationResult(req);

if (!errors.isEmpty()) {
  return res.status(422).json({ errors: errors.array() });
}
```

If an error occurs, the rest of the code will not execute, keeping your database safe from any potentially malicious code. In addition, the client is notified of the error, which will allow them to fix it and resubmit their data if it was, in fact, a harmless mistake.

You can and should use validation for endpoints where data could be entered via the body of an HTTP request. Your myFlix application has at least two endpoints that require data in their bodies (adding a new user and updating an existing user), both of which will require a validation code.

Now that you’ve explored the final security mechanisms you’ll be implementing in your app, it’s time to switch gears for the final time in this Achievement. After all, your API won’t do much good just sitting on your computer. You need to host it!

# Hosting Your API
Back in your Intro to Frontend Development course, you learned all about hosting websites and setting up your own domain. At the time, we referred you to convenient hosting providers such as GoDaddy, DreamHost, and HostGator. This traditional type of hosting provider generally provides two categories of hosting: shared hosting, in which your website shares a server with other customers’ websites, and dedicated hosting, in which your website is hosted on its own server.

Shared hosting comes with its drawbacks: performance may suffer as the server is shared by multiple clients, and you (as a customer) don’t have full control over the server. This is opposed to dedicated hosting, which is generally more expensive, but has better performance and control. Even with dedicated servers, however, large businesses oftentimes need to purchase multiple servers as their web traffic grows. This can lead to wasted costs, especially if their traffic were to ever slow down again in the future.

To solve this, certain tech conglomerates including Amazon, Google, and Microsoft now offer customers the ability to rent out their own servers on an as-needed basis. This arrangement is called Infrastructure as a Service (IaaS), or, as you might know it better, “cloud infrastructure.” When hosting your website or application on an IaaS provider such as Amazon Web Services (AWS), you don’t need to manage your own server, as it’s handled by the provider.

A Platform as a Service (Paas) model goes even further than IaaS—it offers not only servers and storage on an as-needed basis, but also an operating system and tools to help you build and deploy your application. These cloud and platform services are often referred to as cloud computing or serverless programming.

In a future Achievement, you’ll learn more about serverless programming and its benefits. For now, however, you’ll simply learn how you can use a PaaS provider called Heroku to host your myFlix API. This will make your API publicly accessible via the internet instead of just a local application on your computer.

## Hosting with Heroku
> TIP!
After you complete the following steps, your app and database will be live on the web for other people to use and access. Thanks to all the authentication and authorization procedures you've put in place in the last two Exercises, no unauthorized entities should be able to make changes to your app or database; if you hadn't, however, malicious entities could possibly access your data and make changes, either in the form of an (unfunny) joke or because they want to collect user data. As part of this last Exercise of the Achievement, your mentor will check to ensure that they can't make any unauthorized changes to your app or database. This is something important to keep in mind whenever you host projects online in the future!


As mentioned above, your API is still only hosted on your local server (localhost), which is why it's only visible to you and can’t actually be used by anyone else. To rectify this, you need to configure and deploy your page to a remote PaaS provider. While you have a few different options when it comes to PaaS providers for your API, the most popular choice amongst web developers tends to be Heroku. It’s also perfect for your purposes now as they offer a limited free plan that’s great for developers who are just starting out and want to get experience using the service. Let’s now walk through how you can get your API deployed to Heroku.

>Perk: GitHub for Education and Heroku Access
As a CareerFoundry student, you're eligible for a GitHub Education account. This gives you free access to GitHub’s Student Developer Pack, which offers discounts and free access to an awesome array of developer tools and services.

Through this Student Developer Pack, you can use important Heroku features and services (which you'll need for this task and your myFlix project) for free. If you're interested, you can learn more about Heroku's offering for registered GitHub students.

- Sign up for a free Heroku account.
- Follow the guidelines shared earlier for accessing Heroku’s offering for GitHub Education students.
- Install the Heroku Toolbelt. Only complete the steps listed on the “Set up” page (i.e., the initial installation, the Heroku login command in your terminal, and checking your version of Node, npm, and Git).
- Update your “package.json” file to include a “start” script. To do so, open your “package.json” file in your text editor and under the scripts section, add the following code: "start": "node index.js". If you already have a “test” script listed, you can either replace it with your new “start” script or add your start script underneath it (though make sure you add a comma at the end of the “test” script to separate them).
- Update your app.listen(); function in your “index.js” file. Currently, you have the listening port hardcoded to 8080. Now that people other than you will be using your app, you need to allow this port to change if necessary. This is done by way of process.env.PORT, which looks for a pre-configured port number in the environment variable, and, if nothing is found, sets the port to a certain port number. Go ahead and replace your current app.listen(); function with the following code:
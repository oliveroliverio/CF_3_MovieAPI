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


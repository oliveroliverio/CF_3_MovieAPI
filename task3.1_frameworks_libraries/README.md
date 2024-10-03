https://careerfoundry.com/en/course/full-stack-immersion/exercise/javascript-frameworks#choosing-the-right-framework-for-the-job

# What Are Libraries and Frameworks?
A library is a prepackaged piece of code that you can incorporate into your project as you like. Think of a library as a box of tools. Libraries range in size from just a few lines of code about very specific things to a range of functions and utilities for all manner of tweaks, features, and functionalities.

A framework, on the other hand, is a predefined structure into which you enter your code. Essentially, a framework determines how your app is built (this is also known as being “opinionated”). By providing a set of universal and reusable functions, frameworks can streamline the building of a certain type of app. As a refresher, the programming language you use is like the raw lumber for creating a table, and the programming framework is the instructions (a set of standards and opinions) on how to create the table.

You can also think of this difference in terms of an inversion of control. When using a library, the developer—you, in this case—is in control. You call the functions as (and when) you want to. With a framework, however, you surrender control of which pieces of the tool you use. You have to follow the framework’s rules and adopt its structure throughout the development process; the framework calls you. In this sense, the control is inverted.

# Choosing the Right Framework for the Job

## Scale
Thinking about the amount of data to be processed

>Server-Side Scaling
There’s a difference between writing an app that will be used by a few business clients and an app that will be used by millions of users. Scale in this sense—the sheer number of users—concerns the server-side rather than the client-side of an app. This is because the server-side is the part of the app that processes user requests and can therefore be slowed down by many users making requests at the same time. Client-side code is executed in the user’s browser, so it won’t be affected by the number of users at any given time.

## Scope
How project will evolve over time.  Adding new features, functionality, UI elements.

**Entropy**:  How a codebase (if not given restraints) can grow in an unmanageable fashion. Codebases that experience entropy can make developers afraid to make changes.  This part becomes inflexible, and difficult for innovation.  This makes developers re-write an entire app, which is inefficient.

Frameworks help here.  This is because they enforce constraints from day one, and give developers a way to structure and organize their code so it can grow and change without whole parts breaking.

## Documentation

## Popularity
- Stars in GitHub: A “star” acts as a way to bookmark a repository or project so you can easily refer back to it at a later date. At the time of writing, for example, React’s GitHub repository has over 196,000 stars. The more stars, the more interest there is in a particular project.
- Contributors on GitHub: This shows the number of external contributors to a GitHub project, beyond the administrators, and can indicate interest in a project.
- Tagged questions on Stack Overflow: Tags are used to indicate the topic of a question. If there are lots of questions with the same tag, such as “react”, it means that a lot of React developers are asking questions on Stack Overflow. The number of stars a question has can also be indicative of popularity.
- Google search trends: A search trend can show how interest in a topic has grown or fallen over time.
- Package downloads: The number of times a package has been downloaded is a direct indicator of how many projects are using a particular package, which, in turn, can indicate its popularity.
- Mentions of a framework in job adverts: If a particular framework or tool comes up frequently in job adverts, it shows that employers are interested in it.

## Tooling and Ecosystem


## Testability


## Environment

# myFlix’s Project Needs
Requirements
- Scale: You’re not going to be handling large amounts of data on the client-side, so you don’t need to worry too much about performance; however, there is a possibility that this could change, so it’s best not to rule it out just yet.
- Scope: While your project has a clearly defined scope right now, that’s not to say it won’t grow over time. As a developer, you’ll regularly find yourself learning new things that you might want to implement in existing projects. For this reason, you’ll want to make sure that your client-side can accommodate additional views, functionality, features, and complexity, without the risk of entropy.
- Documentation: Since you’re just starting out, it’s best to pick a framework that has comprehensive documentation. It’s a bonus if you pick a straightforward and user-friendly framework to work with.
- Popularity: Given that you’re building this app as a portfolio project, it would be a plus for potential employers if you use a popular framework. You’re also more likely to find solutions to any issues you run into as you build your app.
- Testability: You want to be able to test your code to make sure it’s error free!
- Tooling and Ecosystem: As a developer in the making, you'll benefit from a good ecosystem of tools to work with as you can continue to develop your skills in the future.
- Environment: Since you’ll be the sole developer on this project and building it from the ground up, it would be better if you didn't have to worry about working with an existing codebase and an already-established framework.


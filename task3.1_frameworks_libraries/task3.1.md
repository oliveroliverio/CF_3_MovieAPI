# 1. Scenarios
Which would be more suitable, a library or a framework?  Once decided, which features would be useful, and what particular library/framework?

## jQuery refactoring

>You’ve been asked to create a new version of an app used by product administrators to manage settings and display data about user activity and information. The current version was written using jQuery but grew organically, and it’s become hard to maintain and add new features to it. It’s a medium-sized app, with multiple views displaying a lot of data and forms.
- Initially, a library, since there's already legacy code base in which you can simply incorporate prepackaged pieces of code.  Frameworks require careful consideration at the beginning of projects since these are predefined structures and determines how an app will be built.  Much of this might need to be rewritten in a framework to give the increasingly complex app some structure and support future growth.  React would be a good choice since this is amenable to prototyping unlike Angular.  Components intuitively build up the structure and can increase in complexity as the project grows.


## Data record displayer
>You’ve been asked to build a new piece of your company’s web app. The existing app consists of several sub-apps served independently under different routes by an Express server, which allows for different technologies and frameworks to cohabit. You’ll be building what is essentially a huge table that will display hundreds of thousands of data records.
- A framework would be suitable for this, specifically a framework with the ability of managing both back-end and front-end.  And thus, Angular would be the framework of choice for this scenario. Given the complex structure of various subapps connected by an express sever, I'm assuming there will be a lot of back-end programming.  Because of this, Angular, a framework with the purpose of managing both back-end and front end would work well.

## Quick prototyping
>Your designers have tasked you with creating a prototype for a standalone app to be used internally by your product team. The app will showcase the product team’s design system (colors, components, fonts, styling, etc.).
- A framework would be suitable for this, specifically a prototyping framework.  React could work since you would be use components to rapidly prototype.  But Vue, was speficially built as a solution to Angular's time extensive and prototyping issues.

# 2. Why React for myFlixApp
React can be used for the mobile as well as desktop version of the myFlixApp by utilizing media queries.  It can structure the app in terms of components that can be used for rapid prototyping and previewing before commiting to a defined structure.  Component hierarchies are intuitive since those used to HTML elements have experience with this hierarchical structure.  This will be important when displaying user's favorite movies with subelements or subcomponents such as related directors and actors.
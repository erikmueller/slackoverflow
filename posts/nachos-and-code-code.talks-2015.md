---
title: 'Hamburg code.talks: Nachos and Code'
tags: post
layout: post.liquid
date: '2015-10-28'
image: assets/world.jpg
intro: 'Some weeks ago we attended the `code.talks` developer conference in Hamburg.
Besides the amazing location (which was the Cinemaxx Dammtor) and the awesome catering (as much nachos, popcorn and Mate as you can endure) the conference was also (who would have guessed that) packed with lots of interesting presentations and people.'
categories: ['javascript']
authors: ['Erik']
---

Some weeks ago we attended the `code.talks` developer conference in Hamburg.
Besides the amazing location (which was the Cinemaxx Dammtor) and the awesome catering (as much nachos, popcorn and Mate as you can endure) the conference was also (who would have guessed) packed with lots of interesting presentations and people.

Listening to the many great talks we found things that we're already doing right (according to the speakers) and aspects we can improve on.
There were also talks that we were able to contribute to since we had already come across their problems and solved them.
I'd like to cover **three** main points that I realized during this conference in the following paragraphs.
One last word of advice: Not everything should be taken too seriously ;)

## 1. Node is acknowledged by the Java world

The first talk (I attended) was about _JavaScript on Java Servers_ and was said to cover how the new kid on the block coming around as JavaScript 5 and JavaScript 6 is going to run on a Java Server.
Our Java gurus instantly asked the ultimate question: What is a "Java Server"?
Ok, we all knew it's probably the JVM.
And I myself was wondering if the JavaScript versions 5 and 6 might have something to do with the corresponding ECMA-Script standards.
But hey, let's not get hung up on naming issues, shall we?

Besides advertising _jWebSockets_ there was a benchmark showing that _Nashorn_ (the new JavaScript engine coming with Java8) is way faster than the old _Rhino_ (Java6/7) implementation.
While leveraging Java8's `invokedynamic` it takes some additional time to warm up but afterwards outruns rhino for good.
With _warming up_ the "compiler people" refer to having the programme optimised by the machine until it runs several 10 times faster than in a cold state.
And honestly the difference was impressive.
That being said I noticed that `V8`, Google's JavaScript engine powering _nodejs_ as well as Chrome, still being **twice** as fast as the warmed up Nashorn.
Now that's something.

Anyway, one has to keep in mind that Google threw a lot of resources into developing this awesome piece of software.
Of course you don't get all of the JVM's nifty little things like concurrency, sandboxing and... well basically the complete Java stack but there have to be some drawbacks, right?
To overcome this single-process-problem, node recently introduced a completely overhauled `cluster` module.
This native module as well as process managers like _pm2_ and _strongloop_ do a great job in distributing load between several single-threaded node processes (and with that still crushing any JVM based JS engine).

Nonetheless the talk was pretty interesting with regards to what is possible with the JVM and how easy it is to run JavaScript code on a "Java Server". I was also reminded of why Java is called a typed language (because you have to type so freaking much!).
Things to keep in mind though: All used `npm` packages must be "nashorn compatible".
Whatever this means.

For reading this far you deserve a well kept secret about `npm`: It's **not** an abbreviation for the **n**ode **p**ackage **m**anager but a recursive bacronymic abbreviation for "npm is not an acronym".

However rumor has it, the package manager sends "**n**aughty **p**ush **m**essages" once installed (see [npm-expansions](https://github.com/npm/npm-expansions)).

## 2. We're pretty much up-to-date

In the Frontend/JavaScript track there were several talks covering various different aspects.
From the language itself ('There is no JavaScript' - awesome presentation by Noam Kfir) about interesting testing approaches and a life of suffering with React and ES6.
We realised that our current testing and build pipeline which consists of `mocha`, `babel`, `karma` and `webpack` is not only considered state of the art but is just discovered by some companies.
They shared knowledge of pitfalls they encountered and how they overcame them (or at least how they tried to do so).
Their solution was basically our current build configuration.
But since the topic is pretty tricky, there were of course some nifty tricks we've yet to adopt so we're very glad they went through all that pain and shared these valuable findings.
Anyway, it still gave us a pretty confident feeling about how we're doing things.
These days it seems to be the mix of ES6, ES5 and React modules together with universal JavaScript that is the most challenging thing to master.

## 3. Operations is your new best friend

I have to say that this talk, done by two guys from 1&1, was really inspiring and made you think of changing a thing or two in your own development workflow.

Plainly put, the whole talk was about **DevOps** and how this construct can help to smoothen relations between all kinds of different departments throughout the whole company.
Translated to ourselves they mainly spoke of improving workflows between the RND department (the developers) and the team which takes care of managing and deploying the application (AM).
The scenario described was one that I myself experienced one time or another: The over-the-fence phenomenon.
A developer finishes a feature and sends it to Operations.
Now they can deal with it!
**But**: It might be hard to deploy because of several reasons (be it a changed database structure or some changes in the build pipeline), it might have bugs, break other features or cause who knows what.
So a developer should not only take care of finishing the feature assigned to him (or her) but also have in mind that there's work _after_ the final commit.
Feel responsible for the software as a whole (and everything that is related to it)!

The 1&1 guys gave several tips on how to improve communications and workflows. They also talked about how _they_ tried to establish DevOps.
Bringing together developers and operations not only smoothens (and probably speeds up) the workflows but also widens the knowledge of both department's members.
And learning new things can never be bad ;)

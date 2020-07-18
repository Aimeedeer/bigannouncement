# The Big Announcement HackFS Hacklog

This is a brief log of our daily work on
[The Big Announcement][tba] for [HackFS 2020].

[tba]: https://github.com/Aimeedeer/bigannouncement
[HackFS 2020]: https://hackfs.com/


## 2020/07/17

Over the last few days we hacked on a basic [Solidity contract][contract] for storing and retrieving
a single message content hash,
and connecting to it with web3.js.

[contract]: ../contracts/BigAnnouncement.sol

We used [Remix] to write, test and deploy the contract to the Ropsten test network.

[Remix]: http://remix.ethereum.org/

In the future we are pretty sure we'll need something more sophisticated than
Remix and deploying to the (slow) live network --
probably running the solidity compiler locally and deploying to a local network --
but for this simple test it worked fine.

We succeeded at reading the default message stored in the contract,
but haven't yet tried to store a new message to the contract.

We ran into a strange error in our use of js-ipfs.

We've been using the minified version if js-ipfs from the jsdelivr CDN at

```html
<script src="https://cdn.jsdelivr.net/npm/ipfs/dist/index.min.js"></script>
```

it was working previously, but today we discovered that the browser
is reporting an error during message upload:

```
Uncaught (in promise) TypeError: (intermediate value) is not async iterable
    at submit (script.js:93)
```

We don't know how to debug this but on a whim tried the non-minified version at:

```html
<script src="https://cdn.jsdelivr.net/npm/ipfs/dist/index.js"></script>
```

And using this version we do not see the error any more.

Based on this experience we feel that using js-ipfs from the CDN,
which may serve us any arbitrary version of the library,
is unwise,
and that we should be using our own build of the library.

So we tried to build js-ipfs.

We found the documentation incomplete.
As with other JS projects we've experienced,
experienced JS devs might be able to infer the missing
instructions,
but we had a difficult time.

The most obvious missing information in the build instructions
was to explain _where the output of `npm run build` would be_.

We finally found it at`js-ipfs/packages/ipfs/dist/`,
but the build process only produced the minified script, `index.min.js'
(contrary to what the instructions say),
and we really want the unminified javascript for development.

During this process we had to read a bit about npm, lerna, aegir,
and webpack, while reading through layers of config files, and
fighting incompatible npm versions.
And we didn't succeed.

We could use some help figuring out how to build an unminified js-ipfs for the browser.
Until somebody explains to us how to build the unminified js-ipfs we'll continue to use
one from CDN.

We notice that the js-ipfs repo also doesn't have a release page for downloading built versions.

Our next step is going to be writing the content hash of our IPFS message to our Ethereum
smart contract.

Hopefully by the end of week 2 we will have an end-to-end working prototype,
but with our poor velocity going to take some serious heads-down hacking.


## 2020/07/14

Today our goal was to write code to store to IPFS from the browser, somehow.
For real this time.

And we succeeded.

Carson from Textile had a Zoom with us this morning to help us figure out a solution that meets our requirements.
He was helpful,
and we decided we could do what we want without Textile,
just using js-ipfs in the client.

Thanks, Carson.
For our next,
undoubtedly more complex project,
we'll look into Textile again.

So today we are trying to run js-ipfs in the browser based on its
[examples](https://github.com/ipfs/js-ipfs/tree/master/examples/browser-script-tag).

When we first try to reproduce the example in our own code we see errors in the browser console like

```
Firefox can’t establish a connection to the server at wss://lon-1.bootstrap.libp2p.io/p2p/QmSoLMeWqB7YGVLJN3pNLQpmmEk35v6wYtsMGLzSr5QBU3.
```

After a lot of experimentation the error went away,
without any code changes.
Seems it was a transient error,
perhaps not even a fatal one.
Maybe that particular bootstrap node was really down.

In the end we did manage to publish a message to IPFS using js-ipfs,
and we verify that it was published by requesting the message by content hash from an IPFS gateway.

We managed this by essentially copy-pasting code from
the [browser-script-tag] example and the [ipfs-101] js-ipfs examples.

[browser-script-tag]: https://github.com/ipfs/js-ipfs/tree/master/examples/browser-script-tag
[ipfs-101]: https://github.com/ipfs/js-ipfs/tree/master/examples/ipfs-101

It was quite a frustrating experience though,
a lot of which is due to our relative inexperience with the npm ecosystem.
Beyond the transient IPFS bootstrap node error,
the documentation was not simple to use,
and seemed insufficient.

The `js-ipfs` [Getting Started] docs are heavy on examples,
and API documentation,
but there isn't a clear tutorial-style onboarding-flow in the docs.
We got started by copy-pasting from examples,
but didn't feel confident or informed while we were doing it.

[Getting Started]: https://github.com/ipfs/js-ipfs#getting-started

We are working in a browser environment,
and so far not using npm.

The examples are geared toward npm users,
expect npm knowledge,
and casually import npm packages (like `it-all` and `it-last`)
that I don't know how to access in the browser without
setting up npm.

The instructions for executing the `browser-script-tag` example
seemed to be incorrect, or incomplete,
building only the full `js-ipfs` repo,
but not the example itself.
We were only able to get it running by guessing
the correct commands and reading `package.json`.

This would probably all have been straightforward for someone with a lot of npm experience,
but not us.

The ["IPFS Core API" documentation][core-api] seems frankly wierd.

[core-api]: https://github.com/ipfs/js-ipfs/tree/master/docs/core-api

It's a collection of ad-hoc Markdown files with no guidelines on how to use the API,
or what the various modules represent.
I am not sure if this is a result of being a cross-product API specification,
insufficient standards for JavaScript documentation generally, or something else,
but the docs are not that approachable.

I look at that page wondering how to construct an `Ipfs` node in JavaScript,
the first step, and am lost.

Frustrations aside, we did learn today, and we made progress.
The path to completing our MVP looks pretty clear.


## 2020/07/12

Today we're trying to write to IPFS from our decentralized website.

Our application needs to store just a single "message" at a time to IPFS. That
message's content hash is stored to Ethereum for later retrieval.

We don't want to run our own servers. Our ultimate goal is to write
an app that cannot be censored, and interposing our own server
into the application flow would not meet our requirements.

We're starting by looking at HackFS sponsors' APIs ([Pinata], [Textile], [Fleek]) to
see if any meet our needs.

[Pinata]: https://pinata.cloud/
[Textile]: https://textile.io/
[Fleek]: https://fleek.co/

From a cursory read of the docs, we don't think any of them quite meet our
requirements. For our purposes they either seem to require running our own
server or using account secrets in an incorrect way.

We could use help figuring out how to meet our requirments.


### Evaluating IPFS services

_Pinata_'s APIs look nice and simple, but every request requires a secret API key,
which seems to mean it can't be used directly from a web client.

This seems like a problem we're likely to encounter with any third-party service.

_Textile_ has something called "UserAuth" that might be appropriate - I can
imagine just creating a single global user and letting everybody that interacts
with the website be that user. But presumably that means that anybody could
abuse that account and force Textile shut it down.

Textile does interestingly have a variety of user authentication providers,
one of which is Metamask. Since our app flow uses Ethereum anyway, that
may mean that we could harness the user's Metamask instance for their authentication,
without any extra annoyances beyond those already required to use Metamask
(or some other Ethereum wallet).

But Textile also seems to require running one's own server as part of the
authentication process.

Further, Textile seems very complex. We are overwhelmed reading the docs.
Our use case seems so simple.

All I want is a decentralized way to write and pin _one message_ to IPFS.

_Fleek_ has buckets, and it looks like each bucket can have its own secret API key,
but it also would seemingly be prone to abuse if we shared the secret key in
our web app.

_js-ipfs_ on the other hand can seemingly run a full node in the browser,
presumably with libp2p over WebRTC. I would hope it doesn't require
us to host a server, but don't know.


### An imaginary design

I don't think any of these third-party services meet our requirements - they
all seem to be adding a central point of authority and failure on top
of the distributed system.

Here's a decentralized design that seems to work for me:

- Run js-ipfs in the browser as part of the web page
- Publish message to js-ipfs
- Write message hash to an Ethereum contract for retrieval later

At that point everything is published, but the message is not
pinned, so might disappear as soon as the web page is closed
and the js-ipfs instance shut down.

To solve that we can do a variety of mitigations:

1) Have the client request the published message content
   via a variety of IPFS HTTP gateways.
    - This should have the effect of, temporarily at least,
      distributing the content through some number of nodes
      in the IPFS network.
2) Run a server (potentially behind TOR) that:
    - Listens to the Ethereum contract events
    - Requests and pins the message via IPFS
    - But is _not_ connected directly to the client

Is there any existing service that can do this?

From what I know right now (which is not a lot), what would be
ideal is a service that monitors the ENS changes of a single
domain, and immediately pins its content. That way I could
publish via js-ipfs in the client, update some ENS address
via Metamask, and have the content immediately pinned without
ever making a request to a centralized service.

That ENS-pinning service may also be a centralized entity, but could also be
multiple centralized entities, or a decentralized network.

Conceptually, this seems to be what FileCoin _could be_,
but AFAICT there is no bridge between Ethereum (or ENS)
and FileCoin, either centralized or decentralized.


### The plan

We have to go forward in some direction.

For now, we are going to punt - we're going to create a web service
that holds Pinata keys, have our client to talk to that, and carefully
design it so that it can't be abused.

We'll get that working, then hack on alternatives. We may end up adding
resiliancy to the system by having a variety of ways to store our single IPFS
message. And doing it in a variety of ways will be good practice anyway.


## 2020/07/10

We didn't write any code today, just attended two workshops.

### Workshops attended

- [Connecting ETH to IPFS](https://www.youtube.com/watch?v=vqrLr5eOjLo). Austin shared an awesome session with us!
  - [Programming Decentralized Money](https://medium.com/@austin_48503/programming-decentralized-money-300bacec3a4f)
  - [Decentralized Deployment](https://medium.com/@austin_48503/decentralized-deployment-7d975c9d5016)
  - [Connecting ETH to IPFS](https://medium.com/@austin_48503/tl-dr-scaffold-eth-ipfs-20fa35b11c35)
- [Building an App with Filecoin from scratch - using Slate Components & Powergate](https://www.youtube.com/watch?v=FJjPMKRy8xQ). Some interesting Q&As:
>Andrew: while a single file could be stored by multiple users. a single user would know if they had already stored the file (since powergate will know the CID already) that is to say, it doesn’t monitor the entire network of deals. just what it knows locally

>Ahmed: How do I know when Powergate Testnet finishes syncing?
>Andrew said it might take a day to sync

>Aaron: Easiest to use the lotus cli. There is a lotus sync wait command. Or something like that

>Jeromy: The hackFS devnet ‘nerpa’ should sync quite fast

>Andrew: _stops holding breath_

>Juan: (This is awesome because it’s how real programming works — watching debug => super useful)

>Aaron: You can configure whether you want ipfs storage, filecoin, or both 

>Ahmed: So basically with the Powergate CID Config

>Aaron: yep

## 2020/07/09

Today we just hooked up some JavaScript to our input form,
in preparation for calling APIs to store data on IPFS.
We don't know much JavaScript so it's slow incremental progress.

We ran out of beer today, which is something of emergency.

### Workshops attended

- [Fleek: Getting Started with Space Daemon](https://www.youtube.com/watch?v=f5LRSpGGuQE)
  - [Space Daemon](https://github.com/FleekHQ/space-daemon). The Space Daemon packages together IPFS, Textile Threads/Buckets, and Textile Powergate (Filecoin*) into one easy to install Daemon to make it easy to build peer to peer and privacy focused apps.
- [Piñata Cloud: The Broken Token](https://www.youtube.com/watch?v=0iuAvE-a0fI)


## 2020/07/08

Today we worked on setting up our domain names, using ENS and Unstoppable Domains.

### [ENS](https://ens.domains/)

- I (Aimee) couldn't find any useful documentation to help me put my website-content hash to the domain.
- I finally found a video [Tutorial: How to Host Your Website Using ENS+IPFS](https://www.youtube.com/watch?v=oA4oOY5zgU0), that helped me with my deployment.
  - She explained `Resolver`
  - At 3:16, she clicked the up right side of `Records`, which I see didn't at all on my own!
  - I finally know where to put my content hash.
    Here I had to precede the hash with `/ipfs/`, whereas with Unstoppable Domains I did not.
  - Though it took a while to show our webpage. Ethereum tx confirmed slowly.
-  I spent 2.11 USD valued Ether gas fee for the first deployment tries. It might be costly for hosting a frequently updated website.

Finally [bigannouncement.eth] works! (If you have the appropriate browser extension)

[bigannouncement.eth]: https://bigannouncement.eth


### [Unstoppable Domains](https://unstoppabledomains.com/)

Registered bigannouncement.crypto domain. Thanks to the Unstoppable team!

- There was a warning that with high Ethereum traffic, it might take up to 72 hours for changes to go through.
  Ours went through in a few minutes though.
- There isn't as much browser support for Unstoppable Domains yet as there is for ENS
- I installed the Unstoppable extension on Brave, and it crashed when I visited bigannouncement.crypto,
  so I haven't actually seen the domain working yet.

### Concerns

As has sometimes been the case with our previous Dapp experiences,
interacting with Ethereum through the web was slow,
unpredictable, and frustrating.

It would be nice to set up our CI to update the CID of our domain names every time we
deploy, but so far we don't know how to do it. For the purposes of this hackathon
it's probably fine if we don't figure that out.

### Workshops attended

- [Unstoppable Domains: Onboarding the planet to the decentralized web](https://www.youtube.com/watch?v=Gz3Fv3oZdDM)
- [The Graph: Indexing the New Economy](https://www.youtube.com/watch?v=e5OwjDao3MA)
- [How Filecoin Works: an in-depth system overview](https://www.youtube.com/watch?v=P28aNAdZDi4)

## 2020/07/07

We experimented with IPFS deployment today,
using go-ipfs, js-ipfs, [Pinata], and [Fleek].

Aimee [took some notes on what she learned today][aimee-hackmd].

[aimee-hackmd]: https://hackmd.io/@s7R2jcPBT0q8DCVZ0qUJzg/H15SJ7zJv

The version deployed with go-ipfs is here:

> https://ipfs.io/ipfs/QmVW6oTQAVU1XB65jd8rMqbwaY4f5ryGCpya8VLv84HEEz/

The version deployed with Fleek is here:

> https://ipfs.io/ipfs/QmXv37wN6hmYgU7n1B4G9XykUmhyW8pLGToRQQN3uLDL1A/

It's not clear why the hashes are different -
whether we deployed two different versions,
or whether the content is subtly changed by Fleek before deployment.
I would expect the hashes to be the same whether deployed from go-ipfs
or Fleek.

[Pinata]: https://pinata.cloud
[Fleek]: https://fleek.co

It was all fairly straightforward, though Aimee had difficulty
building and using the js-ipfs tools, probably because she doesn't
understand the npm tooling well.

Aimee ran into a number of bugs with Fleek's UI,
where it was returning 404s unexpectedly.

One scenario in which this happened:

- Create a Fleek project called bigannouncement
- Create another project called fooannouncement (I forget the actual name)
  that uses to the same GitHub repo, and configure it such that it works
  as expected
- Delete the bigannouncement project
- Rename fooannouncement to bigannouncement

After we did this sequence our "bigannouncement" Fleek project seemed
to be broken. We couldn't change the deployment settings or even
delete the project. When we tried we got 404 messages.

Aimee reported the bug in the Fleek team's slack channel,
but after some time the UI seemed to sort itself out,
and she was able to successfully delete and recreate the project.

At the moment she can't click on the "Deploys" tab without getting a 404.

We were creating, deleting, and renaming projects to have the same
name as deleted projects, so it seems likely the bug has something
to do with project-renaming.


### Workshops attended

- [Getting started building with Textile](https://www.youtube.com/watch?v=IZ8M9m9_uJY)



## 2020/07/06

First day of HackFS.

There were some workshops last week,
some of which we attended.

Our objective is to learn how to write an Ethereum DApp,
that writes to IPFS storage,
and does not depend on a dedicated server.

Last week we brainstormed project ideas

We created an MVP roadmap,
with intentionally simple scope,
and prototyped the UI,
currently deployed to

> https://aimeedeer.github.io/bigannouncement/www/

We intend to write a blog post about the experience,
and [began outlining it][blogpost].

[blogpost]: blogpost.md


### Workshops attended

- [IPFS basics and tools](https://www.youtube.com/watch?v=ldEDa6_CT7k)
- [Solidity 101](https://www.youtube.com/watch?v=Tsm9Kt2WjIw)
- [Getting started building with FileCoin](https://www.youtube.com/watch?v=SePJrCLUM0g)
- [Decentralized messaging and libp2p](https://www.youtube.com/watch?v=69h1zhIdCN0)
- [HackFS opening ceremony](https://www.youtube.com/watch?v=xMRDhd7goJU)

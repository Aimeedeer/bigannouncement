# The Big Announcement HackFS Hacklog

This is a brief log of our daily work on
[The Big Announcement][tba] for [HackFS 2020].

[tba]: https://github.com/Aimeedeer/bigannouncement
[HackFS 2020]: https://hackfs.com/


## 2020/07/12

Today we're trying to write to IPFS from our decentralized website.

We don't want to run our own servers. Our ultimate goal is to write
an app that cannot be censored.

We're starting by looking at HackFS sponsors' APIs ([Pinata], [Textile], [Fleek]) to
see if any meet our needs.

[Pinata]: https://pinata.cloud/
[Textile]: https://textile.io/
[Fleek]: https://fleek.co/

From a cursory read of the docs, we don't think any of these services do what we
want. For our purposes they either seem to require running our own server or
using account secrets in an incorrect way.


### Evaluating IPFS services

_Pinata_'s APIs look nice and simple, but every request requires a secret API key,
which seems to mean it can't be used directly from a web client.

This seems like a problem we're likely to encounter with any third-party service.

_Textile_ has something called "UserAuth" that might be appropriate - I can
imagine just creating a single global user and letting everybody that interacts
with the website be that user.

But presumably that means that anybody could abuse that account and force
Textile shut it down.

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

I don't think any of these third-party services are what I want - they
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

That ENS-pinning service may also be a centralized entity,
but could also be a decentralized network.

Conceptually, this seems to be what FileCoin _could be_,
but AFAICT there is no bridge between Ethereum (or ENS)
and FileCoin, either centralized or decentralized.


### The plan

So we have an idea of how we _want_ our decentralized architecture to look, but
don't know how to build it, without doing it ourselves.

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

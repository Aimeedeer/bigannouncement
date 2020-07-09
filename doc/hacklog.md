# The Big Announcement HackFS Hacklog

This is a brief log of our daily work on
[The Big Announcement][tba] for [HackFS 2020].

[tba]: https://github.com/Aimeedeer/bigannouncement
[HackFS 2020]: https://hackfs.com/

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

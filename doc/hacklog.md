# The Big Announcement HackFS Hacklog

This is a brief log of our daily work on
[The Big Announcement][tba] for [HackFS 2020].

[tba]: https://github.com/Aimeedeer/bigannouncement
[HackFS 2020]: https://hackfs.com/

## 2020/07/08


### Workshops attended

- [Unstoppable Domains: Onboarding the planet to the decentralized web](https://www.youtube.com/watch?v=Gz3Fv3oZdDM)


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

# The Big Announcement

An uncensorable website that delivers a single message,
authored by the individual with the deepest pockets
(the most ETH).

> [bigannouncement.eth](https://bigannouncement.eth)

> [bigannouncement.crypto](https://bigannouncement.crypto)

> [bigannouncement.news](https://bigannouncement.news) -- auto deploy

Developed during [HackFS 2020],
it is a minimal project that demonstrates
the integration of [Ethereum] and [IPFS] with the web.

[HackFS 2020]: https://hackfs.com/
[Ethereum]: https://ethereum.org/
[IPFS]: https://ipfs.io/

We are keeping a brief [hacklog] of our daily work,
while also drafting a [blog post] about the experience
and what we are learning.

[hacklog]: doc/hacklog.md
[blog post]: doc/blogpost.md


## MVP Roadmap

- [x] Create UI prototype
- [x] Deploy static site to IPFS using go-ipfs / js-ipfs / rust-ipfs first
- [x] Deploy static site to IPFS using Fleek via GitHub hooks
- [x] Configure ENS domain name
- [x] Store message to IPFS using js-ipfs
- [x] Store and retrieve message hash from Ethereum
- [x] Retrieve and display message from IPFS
- [x] Implement bidding on message in ETH

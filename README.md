# socialkontracts
https://hack.ethglobal.co/showcase/ishan-ghimire-recG3ICPZ63dTR9cw

Helping people enforce healthy habits on the blockchain. Probably my highest density (work output / time input) project ever.

I'll keep this short. Thus, there is data loss here.

Social Kontracts builds on the idea that subconscious "social contracts" modulate much of our behaviour. For example, if I tell my friend I will achieve x goal in y time, I now have social pressure to actually do so. I wanted to use this idea to provide pressure for people to actually follow through on their commonly touted but rarely followed through improvement strategies.

Users will create an account and set their app to report app usage data to the Social Kontracts web app. They can manage their Kontracts through the web app as well. There are currently 2 types of Kontracts, "Invest" and "Streak." Both make the user initially stake an amount they're willing to put on the line to enforce positive habits. "Invest" takes this stake an invests it into a lending pool (AAVE), giving the user profits if they follow through on the terms of their Kontract. "Streak" has no such benefit, but is more interactive, forcing the user to maintain positive habits every day. "Streak" takes the user's stake and actually streams it back to them -> until the Kontract's time period is over, and the full stake is won back, or a Kontract condition is violated ( > x hours of app usage in a day). Thus, they have to maintain the Kontract's conditions every day.

The big idea really is about implementing what people have been touting about smart contracts for so long. Let's really start building out systems that move assets on the blockchain based on real life conditionals.

What's Next?

- More token support
- More game modes (the core of what makes up ideas like "Invest" and "Streak" are infinitely composable)


There's many moving parts here. For the sake of brevity I'll sacrifice cohesion for organization.

Phone app

- made with Dart, using as Android app since only Android currently has usage stats api
- store registration on disk
- perform background task every 15 min of fetching usage data then sending to /report on api

Web app

- Next.js SSR with React
- /login route on api
- using firebase auth
- login page and dashboard
- dashboard hits /getkontracts for data fetching
- on "Invest" kontract creation, we first transfer DAI to MainManager contract, then hit the stake function on MainManager, then we save to db
- on "Streak", first transfer DAI to MainManager, then hit /createstream on API

Api (Node.js/Express)

- /report will take in usage data, find meaningful one base don ccurrently alive kontracts, and then update kontract progress data -> if a kontract is breached, either cut the stream (if "Streak"), or update value for "Invest" indicating breach
- /getkontracts (purely db)
- /createkontract (purely db)
- /createstream will create stream between my wallet and user passed in wallet (they would have already staked at this point

MainManager

- stake and withdraw functions to interact with AAVE lending pool
- deal with DAI tokens (or any ERC20)

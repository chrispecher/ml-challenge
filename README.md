# ml-challenge

Checkout the repo
```
git clone https://github.com/chrispecher/ml-challenge.git 
cd ml-challenge
```

Install the packages
```
yarn install
```

To reproduce the problem start the api server
```
yarn server
```

In a separate terminal in the same folder start the client
```
yarn client_problematic
```

Expected output
```
person added to local store: [ { id: -1, name: '' } ]
person renamed in local store: [ { id: -1, name: 'John' } ]
data on server: [ { id: 0, name: '' }, { id: 1, name: 'John' } ]
```

For the final solution just run the test (uses an independent server port)
```
yarn test
```

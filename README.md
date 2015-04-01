# avneriot
Avner plays with riotjs

```
sudo npm install -g jspm
```

configure jspm's github endpoint:
```
jspm endpoint config github
```

Install
```
jspm install
```

Install some more
```
npm install
```

Because we need the browser package, replace the contents of jspm_packages/ListnPlay/riotjs@2.0.13.js with:
```
define(["github:ListnPlay/riotjs@2.0.13/riot"], function(main) {
  return main;
});
```

Start with:
```
gulp
```

go to http://localhost:3500

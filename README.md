# Auoi Dynamic SVG
This is backend project that creates svg dynamically with reference to backend data.

## Practices
### Echo
<img alt="echo" src="https://dsvg.auoi.net/svg/echo?echo=hello%20world"/>

#### usage
```
<!--
query string params
- echo : echo message
-->
<img alt="echo" src="https://dsvg.auoi.net/svg/echo?echo=hello%20world"/>
```


### Date
<img alt="date" src="https://dsvg.auoi.net/svg/date?nop"/>

#### usage
```
<img alt="date" src="https://dsvg.auoi.net/svg/date"/>
```


### Age
<img alt="age" src="https://dsvg.auoi.net/svg/age?y=2008&m=2&d=8"/>

#### usage
```
<!--
query string params
- y : year of birthdate
- m : month of birthdate
- d : date of month of birthdate
-->
<img alt="age" src="https://dsvg.auoi.net/svg/age?y=2008&m=2&d=8"/>
```


### Github repositories
<img alt="github-repos" src="https://dsvg.auoi.net/svg/github-repos?highlights=javascript,typescript,go&loves=auoi,study"/>

#### usage
```
<!--
query string params
- highlights : highlight items by language names
- loves : add heart emoji to items by keywords to search repository name
-->
<img alt="github-repos" src="https://dsvg.auoi.net/svg/github-repos?highlights=javascript,typescript,go&loves=auoi,study"/>
```
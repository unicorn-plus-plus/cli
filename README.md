# 
<p align="center">
    <img src="https://user-images.githubusercontent.com/16030020/116820358-e7e48000-ab74-11eb-9ed6-b53e74298d52.png" alt="logo" width=150 height=150>
  <h3 align="center">Unicorn-plus-plus CLI</h3>
  <p align="center">
    Unicorn-plus-plus is a packet manager that boosts your <b>.cpp</b> projects with ✨magic✨.
    <br>
    <strong>- Requirements -</strong>
    <br>
    <br>
    <img src="https://img.shields.io/static/v1?label=cpp&message=11&color=007bff">
    <img src="https://img.shields.io/static/v1?label=cmake&message=3.16&color=007bff">
    <img src="https://img.shields.io/static/v1?label=OS&message=Win&color=28a745">
    <img src="https://img.shields.io/static/v1?label=OS&message=Mac&color=28a745">
    <img src="https://img.shields.io/static/v1?label=OS&message=Linux&color=28a745">
  </p>
</p>
<br>

## :rocket: Installation
1. Install [npm](https://docs.npmjs.com/getting-started/installing-node)
2. Execute the command
```shell
npm install unicorn-plus-plus-cli -g
```

## :unicorn: Unicorn Plus Plus
UPP is a wrapper for CMAKE. It aims to standardize the development of cpp libraries. <br>
The main feature is the **upp.json** configuration file. At the moment, the available features are only the ones shown in this example:
```json
{
  "name": "Unicorn",
  "namespace": "Magicland",
  "version": "4.0.4",
  "description": "This Unicorn packet is awersome.",
  "modules": [
    {
      "name": "MagiclandCat",
      "tag": "HEAD",
      "path": "https://github.com/unicorn-plus-plus/cat",
    },
    {
      "name": "MagiclandGuineapig",
      "tag": "HEAD",
      "path": "https://github.com/unicorn-plus-plus/guineapig",
    },
  ]
}
```

## :computer: CLI Commands
>If you want to see help just press `upp` in console.

Here is the list of all commands available:
- `new:simple [name]`<br>
  Create a new simple project. Use this if you want to build a simple main to test stuff.
- `new:executable [name] -n [namespace]`<br>
  Create a new executable project with namespace. Use this for standard project. You must specify a namespace to avoid problems with hierarchy. 
- `new:interface [name] -n [namespace]`<br>
  Create a new interface project with namespace. Similar to executable but you need this version if you use full templates and you don't have .cpp file to compile.
- `help [command]`<br>
  Display help for command.

## :gift: Credits
- **Icon**: made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
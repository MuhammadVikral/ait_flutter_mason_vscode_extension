# ait-mason README

this extension is use for Akar Inti flutter developper to utilize mason in their IDE

## Features

- generate new packages / module
- generate new pages

## Requirements

- Install dart in your machine if you dont have yet
- Install mason from your terminal with this command
  "dart pub global activate mason_cli".
- In your project terminal type in "mason init", it will create mason.yaml file in your project.
- in your mason.yaml file you can change it with this line of code :

```yaml
ait_new_page:
git:
  url: https://github.com/PT-Akar-Inti-Teknologi/ait_flutter_mason.git
  path: ait_new_page
ait_new_package:
git:
  url: https://github.com/PT-Akar-Inti-Teknologi/ait_flutter_mason.git
  path: ait_new_package
ait_cubit:
git:
  url: https://github.com/PT-Akar-Inti-Teknologi/ait_flutter_mason.git
  path: ait_cubit
```

- run mason get
- your package ist ready to use

## Release Notes

### 0.0.1

initial release

---

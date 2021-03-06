# <a href="https://github.com/shiftnrg/shift-js">Shift-JS</a>

Shift JS is a JavaScript library for [Shift - the cryptocurrency and blockchain application platform](https://github.com/ShiftNRG/shift). It allows developers to create offline transactions and broadcast them onto the network. It also allows developers to interact with the core Shift API, for retrieval of collections and single records of data located on the Shift blockchain. Its main benefit is that it does not require a locally installed Shift node, and instead utilizes the existing peers on the network. It can be used from the client as a [browserify](http://browserify.org/) compiled module, or on the server as a standard Node.js module.

[![Build Status](https://travis-ci.org/ShiftNRG/shift-js.svg?branch=development)](https://travis-ci.org/ShiftNRG/shift-js)
[![Coverage Status](https://coveralls.io/repos/github/ShiftNRG/shift-js/badge.svg?branch=development)](https://coveralls.io/github/ShiftNRG/shift-js?branch=development)
[![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](http://www.gnu.org/licenses/gpl-3.0)
[![GitHub release](https://img.shields.io/badge/version-0.4-blue.svg)](#)

## Browser

```html
<script src="./shift-js.js"></script>
<script>
  lisk.api().searchDelegateByUsername("superforger", function (response) {
    console.log(response);
  });
</script>
```

## Server

## Install

```
$ npm install shift-js --save
```

To learn more about the API or to experiment with some data, please go to the github page:

https://github.com/shiftnrg/shift-js

## Tests

```
npm test
```

Tests written using mocha + schedule.js.

## Documentation

- [Install](http://shiftnrg.github.io/shift-js/index.html)
- [API](http://shiftnrg.github.io/shift-js/example/api.html)
  - [Settings](http://shiftnrg.github.io/shift-js/example/api.html#settings)
  - [API Functions](http://shiftnrg.github.io/shift-js/example/api.html#api_functions)
  - [Network Functions](http://shiftnrg.github.io/shift-js/example/api.html#network_functions)
- [Crypto](http://shiftnrg.github.io/shift-js/example/api.html#crypto)
- [Transactions](http://shiftnrg.github.io/shift-js/example/api.html#transactions)
  - [Create Transaction](http://shiftnrg.github.io/shift-js/example/api.html#functions_createTransaction)
  - [Create Vote](http://shiftnrg.github.io/shift-js/example/api.html#functions_createVote)
  - [Create Dapp](http://shiftnrg.github.io/shift-js/example/api.html#functions_createDapp)
  - [Create Delegate](http://shiftnrg.github.io/shift-js/example/api.html#functions_createDelegate)
  - [Create Second Signature](http://shiftnrg.github.io/shift-js/example/api.html#functions_createSignature)
  - [Create Multisignature Account](http://shiftnrg.github.io/shift-js/example/api.html#functions_createMultisignature)
  - [Sign Multisignature Transaction](http://shiftnrg.github.io/shift-js/example/api.html#functions_signMultisignature)
- [Experiment (live)](http://shiftnrg.github.io/shift-js/example/experiment.html)
  - [Get Account Info](http://shiftnrg.github.io/shift-js/example/experiment.html#get_account)
  - [Send SHIFT](http://shiftnrg.github.io/shift-js/example/experiment.html#send_lsk)
  - [Sign Message](http://shiftnrg.github.io/shift-js/example/experiment.html#sign)
  - [Verify Message](http://shiftnrg.github.io/shift-js/example/experiment.html#verify)
  - [Encrypt Message](http://shiftnrg.github.io/shift-js/example/experiment.html#encrypt)
  - [Decrypt Message](http://shiftnrg.github.io/shift-js/example/experiment.html#decrypt)
  - [Lock SHIFT](http://shiftnrg.github.io/shift-js/example/experiment.html#lock)
  - [Pin Content](http://shiftnrg.github.io/shift-js/example/experiment.html#pin)

## Authors

- Matthew Swezey <swezey@shiftnrg.org>
- Ralf S <ralfs@shiftnrg.org>
- GoldenEye <goldeneye@shiftnrg.org>
- Boris Povod <boris@crypti.me>
- Oliver Beddows <oliver@lightcurve.io>
- Tobias Schwarz <tobias@lightcurve.io>

## License

Copyright © 2017-2021 Shift Community Project

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the [GNU General Public License](https://github.com/ShiftNRG/shift-js/tree/master/LICENSE) along with this program. If not, see <http://www.gnu.org/licenses/>.

---

This program also incorporates work previously released with shift-js `0.2.3` (and earlier) versions under the [MIT License](https://opensource.org/licenses/MIT). To comply with the requirements of that license, the following permission notice, applicable to those parts of the code only, is included below:

Copyright © 2017-2021 Shift Project
Copyright © 2016-2017 Lisk Foundation  
Copyright © 2015 Crypti

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

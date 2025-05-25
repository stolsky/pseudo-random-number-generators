[![NPM Version](https://img.shields.io/npm/v/pseudo-random-number-generators-ts.svg?style=for-the-badge)](https://www.npmjs.com/package/pseudo-random-number-generators-ts)

# Abstract

Dependency-free TypeScript implementation with comparison tests of popular pseudo random number generators.

Original JavaScript implementations were taken from https://github.com/bryc/code/blob/master/jshash/PRNGs.md.

# Getting started

```bash
npm install pseudo-random-number-generators-ts
```

# Implementations

## Pseudo random number generators
* Mulberry32
* sfc32
* SplitMix32
* Xoshiro128ss

## Hash algorithms
* MurmurHash3 variant (xmur3)

# Usage

## Functionality
```js
// get a random number between "from" and "to" including this range
random(from = 0, to = 1) 

// get a normally distributed random number using the mean value (m) and the standard deviation (sd)
gauss(m = 0, sd = 1)
```

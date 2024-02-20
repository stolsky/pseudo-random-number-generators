## Abstract

TypeScript implementations and comparison tests of popular pseudo random number generators.

Original JavaScript implementations were taken from https://github.com/bryc/code/blob/master/jshash/PRNGs.md.

## Implementations

### PRNGs
* Mulberry32
* sfc32
* SplitMix32
* Xoshiro128ss

### Hash algorithms
* MurmurHash3 variant (xmur3)

### Functionality
* random(from = 0, to = 1)
  * get a random number between "from" and "to" including this range
* gauss(m = 0, sd = 1)
  * get a normally distributed random number using the mean value (m) and the standard deviation (sd)
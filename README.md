Blinking LEDs
==================

Use a simple programming language to turn LED lights on and off.

LED lights can be turned off and on according to the 8-bit representation of a binary number stored in memory. For example, in a [program](https://github.com/primaryobjects/blinking-leds/tree/master/src/examples/rightmost.txt) that stores the value 2 in the variable 'a', and then calls the output command, the second from the right bulb will turn on. 2 = 0000010 which corresponds to turning on the second from the right bulb.

Likewise, a [program](https://github.com/primaryobjects/blinking-leds/tree/master/src/examples/righttwo.txt) that stores the value 3 in the variable 'x' and then calls the output command, will light up the two right-most bulbs. 3 = 0000011 which corresponds to turning on the two right-most bulbs.

Multiple calls to output will be shown with a delay of 1 second between them. This creates a nifty animation as the bulbs cycle through commands!

Demo
----

Try it out!

http://primaryobjects.github.io/leds

Examples
-------

### Light Right-Most Bulb

```
ld a,1 |
out (0),a |
```

#### Output

```
......*
```

### Light Second From Right Bulb

```
ld a,2 |
out (0),a |
```

#### Output

```
.....*.
```

### Animated Bulbs

Multiple output commands will light bulbs with a 1 second delay between outputs, demonstrating a cool animation effect. Here is a simple example [program](https://github.com/primaryobjects/blinking-leds/tree/master/src/examples/animated.txt) with 4 output commands, with the last command turning all of the bulbs off.

```
ld a,1 |
out (0),a |
ld b,2 |
out (0),b |
ld c,4 |
out (0),c |
ld d,0 |
out (0),d |
```

#### Output

```
......*
.....*.
....*..
.......
```

Why
---

This is part of a programming challenge, posted on [/r/dailyprogrammer](https://www.reddit.com/r/dailyprogrammer/comments/5as91q/20161102_challenge_290_intermediate_blinking_leds/)

[2016-11-02] Challenge #290 [Intermediate] Blinking LEDs

[Developed](http://www.primaryobjects.com/2016/09/19/building-your-first-react-javascript-app/) using Twitter Bootstrap and React.

Author
------

Kory Becker

http://primaryobjects.com
interface testInter {
  color?: string;
}
function test(config: testInter) {
  console.log(config.color);
}
test({ color: "red", name: "test" } as testInter);
interface testInter1 {
  (name: string, color: string): boolean;
}
let test1: testInter1 = function (a: string, b: string) {
  return false;
};
console.log(test1("test", "red"));
// test();
let arr: number[] = [1, 2, 3];
let arr1: Array<any> = ["1"];
let c: unknown = "1";
let obj: Object = 1;
// console.log(obj.toString());
// 类类型,类静态部分与实例部分的区别
interface clockCustructor {
  new (hour: number, minute: number): clockInterface;
}
interface clockInterface {
  tick(): void;
}
function createClock(
  ctor: clockCustructor,
  hour: number,
  minute: number
): clockInterface {
  return new ctor(hour, minute);
}
class DigitalClock implements clockInterface {
  constructor(h: number, m: number) {}
  tick() {
    console.log("beep beep");
  }
}
class AnalogClock implements clockInterface {
  constructor(h: number, m: number) {}
  tick() {
    console.log("tick tock");
  }
}
let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);

// 接口继承
interface shape1 {
  width: number;
}
interface shape extends shape1 {
  color: string;
  name: number;
}
let square = <shape>{};
square.name = 1;
square.width = 10;
class testClass {
  private name: string;
  public height: number;
  protected width: number;
  constructor(name: string, height: number = 0, width: number = 0) {
    this.name = name;
    this.height = height;
    this.width = width;
  }
  see() {
    console.log(this.name);
  }
}
class classEx extends testClass {
  constructor(name: string, height: number = 0, width: number = 0) {
    super(name, height, width);
  }
  tell() {
    // console.log(this.name);
    console.log(this.height, this.width);
  }
}
// new classEx("kill me", 20, 11).tell();

class Greeter {
  static standardGreeting = "Hello, there";
  greeting: string = "";
  greet() {
    if (this.greeting) {
      return "Hello, " + this.greeting;
    } else {
      return Greeter.standardGreeting;
    }
  }
}

let greeter1: Greeter;
greeter1 = new Greeter();
console.log(greeter1.greet());

let greeterMaker: typeof Greeter = Greeter;
greeterMaker.standardGreeting = "Hey there!";

let greeter2: Greeter = new greeterMaker();
console.log(greeter2.greet());

let myFun: (c: string) => number = function (a: string): number {
  return 1;
};
// let proxyValue = { name: 1, value: 2 };
// let p = new Proxy(proxyValue, {
//   get(target, propKey: any) {
//     return target[propKey] + 1;
//   },
//   set(target, propKey: any, value) {
//     return target[propKey] + value;
//   },
// });
// console.log(p.name);
// function identity<T>(arg: T[]): T[] {
function identity<T>(arg: Array<T>): T[] {
  console.log(arg.length);
  return arg;
}
interface testIdentity {
  name: string;
  number: number;
}
// let output = identity<string>("myString");
// let output = identity<testIdentity>({ name: "12", number: 1 });
let output = identity<testIdentity>([{ name: "12", number: 1 }]);
console.log(output);

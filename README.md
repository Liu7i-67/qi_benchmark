# qBenchmark

> 用于对比函数性能
> 依赖于`window.performance.now` api

### 安装

`pnpm add @liu7i/qi_benchmark`

### 使用方法示例

```
import { QBenchmark } from '@liu7i/qi_benchmark';

// 实例化
const benchmark = new QBenchmark();

function test1(){
   // todo
}

function test2(){
  // todo
}

// 添加需要测试的函数
benchmark.add({
    name: "test1",
    taskContent: test1,
    numberOfTimes: 10,
});

benchmark.add({
    name: "test2",
    taskContent: test2,
    numberOfTimes: 10,
});

// 开始测试
benchmark.run();  // 会返回执行结果，可以自己进行分析

// 进行简单的分析 返回平均用时等信息
const analysis = benchmark.analysis();

console.log("analysis:", analysis);
```

### API

| 方法     | 作用     | 参数        | 返回值            |
| -------- | -------- | ----------- | ----------------- |
| add      | 添加任务 | `IWorkList` | `void`            |
| run      | 执行任务 | `void`      | `IRunningResults` |
| analysis | 分析结果 | `void`      | `IAnalysis[]`     |

### interface

```
export interface IWorkList {
  /** @param 名称 需要唯一 */
  name: string;
  /** @param 函数体 */
  taskContent: Function;
  /** @param 需要执行的次数 默认为100 */
  numberOfTimes?: number;
}
```

```
export interface IRecord {
  /** @param 执行顺序 */
  order: number;
  /** @param 执行所属函数体 */
  taskName: string;
  /** @param 执行耗时 单位ms */
  executionTime: number;
}
```

```
export interface IAnalysis {
  /** @param 任务名称 */
  taskName: string;
  /** @param 总耗时 */
  total: number;
  /** @param 平均耗时 */
  average: number;
  /** @param 执行次数 */
  times: number;
}
```

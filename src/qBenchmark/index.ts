/*
 * @Author: liu7i
 * @Date: 2023-05-16 14:48:37
 * @Last Modified by: liu7i
 * @Last Modified time: 2023-05-16 15:27:36
 */

import type {
  IWorkList,
  IRecord,
  IRunningResults,
  IAnalysis,
} from "./interface";
import { useBigNumber } from "./utils";

export class QBenchmark {
  /** @param 等待执行的任务 */
  workList: IWorkList[] = [];
  /** @param 任务执行结果 */
  runningResults: IRunningResults = {};

  /** @function 添加任务 */
  add(work: IWorkList) {
    this.workList.push(work);
  }

  /** @function 执行任务 */
  run() {
    this.runningResults = {};
    for (let i in this.workList) {
      const work = this.workList[i];
      const times = work.numberOfTimes || 100;
      let num = 0;
      const runningResult: IRecord[] = [];
      while (num < times) {
        num += 1;
        const timeStart = window.performance.now();
        work.taskContent();
        const timeEnd = window.performance.now();
        runningResult.push({
          taskName: work.name,
          order: num,
          executionTime: timeEnd - timeStart,
        });
      }
      this.runningResults[work.name] = runningResult;
    }
    this.workList = [];
    return this.runningResults;
  }

  /** @function 获取任务执行结果 */
  analysis() {
    const analysisArr: IAnalysis[] = [];
    for (let name in this.runningResults) {
      const runningResult = this.runningResults[name];
      const total = useBigNumber(0);
      for (let record of runningResult) {
        total.plus(record.executionTime);
      }
      const times = runningResult.length;
      analysisArr.push({
        taskName: name,
        total: total.getNumber(),
        average: total.div(times).getNumber(),
        times,
      });
    }
    return analysisArr;
  }
}

export * from "./interface";

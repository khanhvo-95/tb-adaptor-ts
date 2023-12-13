import { Sema } from "async-sema";
class TBAdaptorProcessorTrigger {
  private readonly THREAD_COUNT: number = 5;
  private semaphore: Sema;
  private executorService: Promise<void>[];
  private tbAdaptorProcessor: any;

  constructor(tbAdaptorProcessor: any) {
    // Member variables
    this.semaphore = new Sema(this.THREAD_COUNT);
    this.executorService = [];
    this.tbAdaptorProcessor = tbAdaptorProcessor;
  }

  async trigger(context: any, message: string): Promise<string> {
    await this.semaphore.acquire();
    const task = this.tbAdaptorProcessor.process(message);
    this.executorService.push(task);
    await this.isTaskDone();
    this.semaphore.release();

    context.log(`All tasks are completed: ${task}`);
    return "your request is being processed";
  }

  private async isTaskDone(): Promise<void> {
    await Promise.allSettled(this.executorService);
  }
}

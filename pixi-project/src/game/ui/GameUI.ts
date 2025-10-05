import { Container, Graphics, Text, TextStyle } from 'pixi.js';

export class GameUI {
  public root = new Container();
  private background!: Graphics;
  private waveText!: Text;
  private timerText!: Text;
  private statusText!: Text;
  private startButton!: Graphics;
  private startButtonText!: Text;

  constructor() {
    this.setupUI();
  }

  private setupUI(): void {
    // Create background panel
    this.background = new Graphics();
    this.background.beginFill(0x1a1a1a, 0.9);
    this.background.drawRoundedRect(0, 0, 300, 150, 10);
    this.background.endFill();
    this.root.addChild(this.background);

    // Wave counter text
    this.waveText = new Text('Wave: 0', new TextStyle({
      fontFamily: 'Arial',
      fontSize: 24,
      fill: 0xffffff,
      fontWeight: 'bold'
    }));
    this.waveText.x = 20;
    this.waveText.y = 20;
    this.root.addChild(this.waveText);

    // Timer text
    this.timerText = new Text('Time: --', new TextStyle({
      fontFamily: 'Arial',
      fontSize: 20,
      fill: 0xffcc33,
      fontWeight: 'bold'
    }));
    this.timerText.x = 20;
    this.timerText.y = 50;
    this.root.addChild(this.timerText);

    // Status text
    this.statusText = new Text('Click Start to begin!', new TextStyle({
      fontFamily: 'Arial',
      fontSize: 16,
      fill: 0xcccccc,
      wordWrap: true,
      wordWrapWidth: 260
    }));
    this.statusText.x = 20;
    this.statusText.y = 80;
    this.root.addChild(this.statusText);

    // Start button
    this.startButton = new Graphics();
    this.startButton.beginFill(0x4CAF50);
    this.startButton.drawRoundedRect(0, 0, 100, 30, 5);
    this.startButton.endFill();
    this.startButton.x = 180;
    this.startButton.y = 110;
    this.startButton.eventMode = 'static';
    this.startButton.cursor = 'pointer';
    this.root.addChild(this.startButton);

    this.startButtonText = new Text('Start Game', new TextStyle({
      fontFamily: 'Arial',
      fontSize: 14,
      fill: 0xffffff,
      fontWeight: 'bold'
    }));
    this.startButtonText.anchor.set(0.5);
    this.startButtonText.x = 50;
    this.startButtonText.y = 15;
    this.startButton.addChild(this.startButtonText);
  }

  public updateWave(waveNumber: number): void {
    this.waveText.text = `Wave: ${waveNumber}`;
  }

  public updateTimer(timeRemaining: number): void {
    if (timeRemaining > 0) {
      this.timerText.text = `Time: ${timeRemaining}s`;
      
      // Change color based on urgency
      if (timeRemaining <= 3) {
        this.timerText.style.fill = 0xff4444; // Red for urgent
      } else if (timeRemaining <= 5) {
        this.timerText.style.fill = 0xffaa44; // Orange for warning
      } else {
        this.timerText.style.fill = 0xffcc33; // Yellow for normal
      }
    } else {
      this.timerText.text = 'Time: 0s';
      this.timerText.style.fill = 0xff4444;
    }
  }

  public updateStatus(status: string): void {
    this.statusText.text = status;
  }

  public showStartButton(show: boolean): void {
    this.startButton.visible = show;
  }

  public setStartButtonText(text: string): void {
    this.startButtonText.text = text;
  }

  public onStartButtonClick(callback: () => void): void {
    this.startButton.on('pointertap', callback);
  }

  public showWaveStart(waveNumber: number, targetsCount: number, timeLimit: number): void {
    this.updateWave(waveNumber);
    this.updateTimer(timeLimit);
    this.updateStatus(`Wave ${waveNumber} started! Save ${targetsCount} pieces from danger!`);
    this.showStartButton(false);
  }

  public showWaveSuccess(waveNumber: number): void {
    this.updateStatus(`Wave ${waveNumber} completed! Next wave incoming...`);
  }

  public showWaveFailure(waveNumber: number): void {
    this.updateStatus(`Wave ${waveNumber} failed! Game Over.`);
    this.setStartButtonText('Restart');
    this.showStartButton(true);
  }

  public showGameOver(finalWave: number): void {
    this.updateStatus(`Game Over! You survived ${finalWave} waves.`);
    this.setStartButtonText('Play Again');
    this.showStartButton(true);
  }

  public position(x: number, y: number): void {
    this.root.x = x;
    this.root.y = y;
  }
}
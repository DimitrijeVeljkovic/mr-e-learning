import { Component, OnInit } from '@angular/core';
import { LearningPath } from 'src/app/interfaces/learning-path';
import { LearningPathService } from 'src/app/services/learning-path.service';

@Component({
  selector: 'app-learning-paths',
  templateUrl: './learning-paths.page.html',
  styleUrls: ['./learning-paths.page.scss'],
})
export class LearningPathsPage implements OnInit {
  public learningPaths: LearningPath[] = [];

  constructor(private _learningPathService: LearningPathService) { }

  ngOnInit() {
    this._learningPathService.getAllLearningPaths().subscribe(res => this.learningPaths = res.learningPaths);
  }

}

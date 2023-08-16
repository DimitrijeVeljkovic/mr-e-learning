import { Component, OnInit } from '@angular/core';
import { LearningPath } from 'src/app/interfaces/learning-path';
import { LearningPathService } from 'src/app/services/learning-path.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-learning-paths',
  templateUrl: './learning-paths.page.html',
  styleUrls: ['./learning-paths.page.scss'],
})
export class LearningPathsPage implements OnInit {
  public learningPaths: LearningPath[] = [];
  public filteredPaths: LearningPath[] = [];

  constructor(private _learningPathService: LearningPathService,
              public userService: UserService) { }

  ngOnInit() {
    this._learningPathService.getAllLearningPaths().subscribe(res => {
      this.learningPaths = res.learningPaths;
      this.filteredPaths = res.learningPaths;
    });
  }

  public handleSearch(event: any) {
    this.filteredPaths = this.learningPaths.filter(path => path.title.toUpperCase().includes(event.detail.value.toUpperCase()));
  }

}

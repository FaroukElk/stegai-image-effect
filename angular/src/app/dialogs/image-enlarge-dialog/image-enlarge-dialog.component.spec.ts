import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageEnlargeDialogComponent } from './image-enlarge-dialog.component';

describe('ImageEnlargeDialogComponent', () => {
  let component: ImageEnlargeDialogComponent;
  let fixture: ComponentFixture<ImageEnlargeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageEnlargeDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageEnlargeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

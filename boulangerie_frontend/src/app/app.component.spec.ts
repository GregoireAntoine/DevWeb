import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ArticleComponent } from './component/article/article.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('AppComponent', () => {
  let service, http, backend;

beforeEach(() => {

    TestBed.configureTestingModule({
        imports: [ HttpClientTestingModule ],
        providers: [ ArticleComponent ]
    });

});
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,ArticleComponent
      ],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'boulangerie'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('boulangerie');
  }));
  it("should create Article component", () => {
    expect(ArticleComponent).toBeTruthy();
  });


});


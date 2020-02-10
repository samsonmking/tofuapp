import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreDataModule } from './core-data/core-data.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RecipesModule } from './recipes/recipes.module';
import { ListsModule } from './lists/lists.module';
import { AuthModule } from './auth/auth.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth-interceptor';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SharedModule } from './shared/shared.module';
import { AuthProvider } from './auth/auth-provider';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    CoreDataModule,
    FlexLayoutModule,
    RecipesModule,
    ListsModule,
    AuthModule,
    SharedModule
  ],
  providers: [
    AuthProvider,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (provider: AuthProvider) => () => provider.load(),
      deps: [AuthProvider],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  
}

# vhap.eval

### Assignment

To "reproduce" the **_beta_** app as shown here: https://vhi-dev.usc.edu/eval

- Click "find" to show the Search input textbox
- Enter text in the text box to perform auto-suggests (sample inputs: "europe" or "food")
- Press enter after the text is entered or select one of the auto-suggest items to perform a Search
- Display the search results
- Click the search result item to show the item detail

### Prerequisites

- Angular latest versions
- HTML and CSS
- Some familiarity with Angular Material/Components and CDK
- Some familiarity Angular FlexLayout
- RxJS

### Angular project

- Clone this repo, or make a public fork
- Pleae use the 'skeleton' app in the projects/beta folder to implement your solution
- Use Angular material/cdk (already installed)  
  https://material.angular.io
- Use FlexLayout (already installed)  
  https://github.com/angular/flex-layout/wiki  
  https://github.com/angular/flex-layout/wiki/Declarative-API-Overview  
  https://github.com/angular/flex-layout/wiki/Responsive-API
- Use existing styles: see _projects/vhap/src/lib/vhap.scss_
- Use exising types: see _projects/beta/src/app/model.ts_

### Getting started

- The input/auto-suggest can be done with _mat-autocomplete_
- The list of items can be done with _cdk-virtual-scroll-viewport_
- The file _beta.service.ts_ has setup the methods for retrieveing data  
  The API is defined at:  
  https://vhap.usc.edu/VHAP.IWitness.API/eval/swagger/ui/index

### Implementation

- Don't worry too much about reproducing the UI accurately, we are looking more for
  functionality and good reactive design and concepts
- It is not necessary to have robust error-handling for this test assignment
- An API Bearer token will be supplied to you, as the API's use OAUTH Authorization
- Take as much time as you need/want, but log how much time you spent -  
  we tried to make the assignment short enough that it doesn't require too much time

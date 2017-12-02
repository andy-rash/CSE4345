import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import {Http} from '@angular/http';
@Component({
	selector: 'home',
	templateUrl: 'home.component.html',
	styleUrls:['home.component.css']
})

export class HomeComponent implements OnInit {
	text: string;
	isResult:boolean;
	public uploader:FileUploader = new FileUploader({url: ""});
	public hasBaseDropZoneOver:boolean = false;
	uploadFile:boolean;
	keywordResults : any[];
	file:any;
	summary:any;
	percentage:any;
	URL = 'https://atts.me/api/';
	constructor(public http:Http ){
		this.text = "";
		this.isResult=false;
		this.uploadFile=false;
		this.percentage=80;
		this.summary= "The quick brown fox jumps over the lazy dog";
		this.keywordResults= [{'word':'lorem', 'value':96},{'word':'ipsum', 'value':15}, 
		{'word':'value', 'value':12}];
	}
	sendRequest(){
		if (this.uploadFile){
			this.http.post(this.URL + 'keywords', {'is_file':true, 'num_words':5, 'body_text': null, 'file':this.file})
				.subscribe(
					data=> {
						console.log(this.keywordResults);
						this.keywordResults=data.json()['data']['keywords'];
						this.summary= data.json()['data']['summary'];
						this.percentage = data.json()['data']['percentage'];
						this.isResult=true;
					},
				err=> console.log(err));
		}
		else{
			this.http.post(this.URL + 'keywords', {'is_file':false, 'num_words':5, 'body_text': this.text, 'file':null})
				.subscribe(
					data=> {
						console.log(data.json());
						this.keywordResults=data.json()['data']['keywords'];
						this.summary= data.json()['data']['summary'];
						this.percentage = data.json()['data']['percentage'];
						console.log(this.keywordResults);
						this.isResult=true;
					},
				err=> console.log(err));
		}
	}
	ngOnInit() { }
	public fileOverBase(e:any):void {
    	this.hasBaseDropZoneOver = e;
		this.uploadFile=true;
  	}
	changeListener($event) : void {
 		this.readFile($event.target);
	}

readFile(inputValue: any): void {
  var file:File = inputValue.files[0];
  var reader:FileReader = new FileReader();

  reader.onloadend = (e) => {
    this.file = reader.result.split(',')[1];
	console.log(this.file);
	this.uploadFile=true;
  }
  reader.readAsDataURL(file);
}
}
import { Component } from '@angular/core';
import { Obj } from '@popperjs/core';
import { CommonService } from './common.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';


interface Pessoas {
  _id: string;
  name: string;
  salary: string;
  approved: number;
}

let PESSOAS: Pessoas[] = [];

export class pessoas {
_id!: string
name!:string
salary!:number
approved!:boolean
}
export class pessoas1 {
  _id!: string
  name!:string
  salary!:number
  approved!:boolean
  }

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent{

public pessoasNew = new pessoas();
public pessoasEdit = new pessoas1();
constructor(public common: CommonService, public modalService: NgbModal){}

    ngOnInit(): void {
      this.getPeople();
    }

  title = 'API-poc';



  getPeople(){
    this.common.GetPessoas().subscribe((res: any) => {
      this.pessoas  = res
      console.log(this.pessoas)
    })
  }
  deletePeople(id: string){
    this.common.DeletePessoas(id).subscribe((res: any) => {
      this.getPeople();
      console.log('Pessoa deletada com sucesso!')
    })
  }
  postPerson(){
    this.common.PostPessoas(this.pessoasNew).subscribe((res: any) => {
      this.getPeople();
      console.log('Pessoa adicionada com sucesso!')
    })
  }
  EditPerson(){
    this.common.EditarPessoas(this.pessoasEdit._id, this.pessoasEdit).subscribe((res: any) => {
      this.getPeople();
      this.modalService.dismissAll()
      console.log('Pessoa editada com sucesso!')
    })
  }

  pessoas = PESSOAS;
  open(content: any, edit: any) {
    this.pessoasEdit = edit
    const modalRef = this.modalService.open(content, {

    });


  }
}

import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.css'],
})
export class ConnectionComponent implements OnInit {
  constructor() {}
  ngOnInit() {
    $(document).ready(function () {
      $('#formLogin').on('submit', function (e) {
        e.preventDefault();
        const email = $('#Email').val();
        const password = $('#Password').val();
        
        console.log(email,password);
        // send ajax
        $.ajax({
          url: '/processlogin',
          type: 'POST',
          data: {
            email,
            password,
          },
          success: function (result) {
            if (result == 'Logged in successfully') {
              alert(result);
              window.location.href = '/admin/dashboard/index';
            } else {
              alert(result);
            }
          },
        });
        return false;
      });
    });
  }
}

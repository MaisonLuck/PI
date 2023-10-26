// Código da página Login - index.html
const forms = document.querySelector(".forms"),
      pwShowHide = document.querySelectorAll(".eye-icon");

pwShowHide.forEach(eyeIcon => {
    eyeIcon.addEventListener("click", () => {
        let pwFields = eyeIcon.parentElement.parentElement.querySelectorAll(".password");
        
        pwFields.forEach(password => {
            if(password.type === "password"){
                password.type = "text";
                eyeIcon.classList.replace("bx-hide", "bx-show");
                return;
            }
            password.type = "password";
            eyeIcon.classList.replace("bx-show", "bx-hide");
        })
        
    })
}) 

// Código da página ajuda - ajuda.html
document.addEventListener("DOMContentLoaded", function () {
  showTab(1);
  document.querySelector(".help-tab:nth-child(1)").classList.add("active");
});

function showTab(tabNumber) {
  var tabContents = document.getElementsByClassName("help-slide");
  for (var i = 0; i < tabContents.length; i++) {
      tabContents[i].style.display = "none";
  }

  document.getElementById("tab" + tabNumber).style.display = 'block';

  var tabLinks = document.querySelectorAll(".help-tab");
  tabLinks.forEach(function (link) {
      link.classList.remove("active");
  });

  document.querySelector(".help-tab:nth-child(" + tabNumber + ")").classList.add("active");
}


// Código da tela modal
function acao(tipo) {
    if (tipo === 'cad') {
      document.getElementById('myModalCad').style.display = 'block';
      preencherSeletorCargo()
    } else if (tipo === 'alt') {
      document.getElementById('myModalAlt').style.display = 'block';
      preencherSeletorCargoAlt()
    }else if (tipo === 'user') {
      document.getElementById('myModalUser').style.display = 'block';
    }
   
}
function acaoPed(tipo) {
    if (tipo === 'cad') {
      document.getElementById('myModalCadPed').style.display = 'block';
      preencherSeletorTurno()
      preencherSeletorItem()
      preencherSeletorEntregador()
      preencherSeletorSolicitante()
    } else if (tipo === 'alt') {
      document.getElementById('myModalAltPed').style.display = 'block';
      preencherSeletorTurnoAlt()
      preencherSeletorItemAlt()
      preencherSeletorEntregadorAlt()
      preencherSeletorSolicitanteAlt()
    }
}
function acaoProd(tipo) {
    if (tipo === 'cad') {
      document.getElementById('myModalCadProd').style.display = 'block';
      preencherSeletorCategoria()
      preencherSeletorStatus()
    } else if (tipo === 'alt') {
      document.getElementById('myModalAltProd').style.display = 'block';
      preencherSeletorCategoriaAlt()
      preencherSeletorStatusAlt()
    }
}      

function acaoDev(tipo) {
    if (tipo === 'dev') {
      document.getElementById('myModalDevol').style.display = 'block';
    }
}

function fecharModal(myModalCadPed) {
  document.getElementById(myModalCadPed).style.display = "none";
}

function fecharModal(myModalAltPed) {
  document.getElementById(myModalAltPed).style.display = "none";
}


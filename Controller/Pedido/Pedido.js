requisaoSelecionarPedido();

$(document).ready(function () {
  $("#cadastrar").click(function () {
    var selectItem = document.getElementById("item");
    var selectEntregador = document.getElementById("entregador");
    var selectSolicitante = document.getElementById("solicitante");
    var selectTurno = document.getElementById("turno");

    var codPatrimonio = $("#codPedido").val().trim();
    var data = $("#data").val().trim();
    var turma = $("#turma").val().trim();
    var item = selectItem.options[selectItem.selectedIndex].value;
    var entregador =
      selectEntregador.options[selectEntregador.selectedIndex].value;
    var solicitante =
      selectSolicitante.options[selectSolicitante.selectedIndex].value;
    var turno = selectTurno.options[selectTurno.selectedIndex].value;

    //

    if (
      codPedido != "" &&
      data != "" &&
      turma != "" &&
      item != "" &&
      entregador != "" &&
      solicitante != "" &&
      turno != ""
    ) {
      $("#codPedido").val("");
      $("#data").val("");
      $("#turma").val("");
      $("#item").val("");
      $("#entregador").val("");
      $("#solicitante").val("");
      $("#turno").val("");

      console.log(codPedido, data, turma, item, entregador, solicitante, turno);

      $.ajax({
        url: "./../Model/pedido/CadastrarPedido.php",
        method: "post",
        dataType: "json",
        data: {
          codPatrimonio: codPatrimonio,
          data: data,
          turma: turma,
          item: item,
          entregador: entregador,
          solicitante: solicitante,
          turno: turno,
        },
        success: function (data) {
          console.log(data);
          if (data.status != "error") {
            const table = document.getElementById("tableped");
            while (table.rows.length > 1) {
              table.deleteRow(1);
            }
            requisaoSelecionarPedido();

            //fechar tela modal automatico depois de cadastrar
            fecharModal();
          } else {
            alert("Erro ao cadastrar");
          }
        },
        error: function (xhr, status, error) {
          console.log(xhr.responseText);
        },
      });
    } else {
      if ($("#codPedido").val().trim() == "") {
        alert("Código não preenchido");
      } else if ($("#data").val().trim() == "") {
        alert("Data não preenchido");
      } else if ($("#turma").val().trim() == "") {
        alert("Turma não preenchido");
      } else if ($("#item").val().trim() == "") {
        alert("Item não preenchido");
      } else if ($("#entregador").val().trim() == "") {
        alert("Entregador não preenchido");
      } else if ($("#solicitante").val().trim() == "") {
        alert("Solicitante não preenchido");
      } else if ($("#turno").val().trim() == "") {
        alert("Turno não preenchido");
      }
    }
  });
});

//PreencherSeletorModal
function preencherSeletorTurno() {
  $.ajax({
    url: "./../Model/pedido/SelecionarTurno.php",
    method: "post",
    dataType: "json",

    success: function (data) {
      if (data.status != "error") {
        var _option = $("#turno");

        for (var i = 0; i < data.length; i += 2) {
          _option.append(
            '<option value="' + data[i] + '">' + data[i + 1] + "</option>"
          );
        }
      }
    },
    error: function (xhr, status, error) {
      console.log(xhr.responseText);
      console.log(error);
    },
  });
}
function preencherSeletorItem() {
  $.ajax({
    url: "./../Model/pedido/SelecionarItem.php",
    method: "post",
    dataType: "json",

    success: function (data) {
      if (data.status != "error") {
        var _option = $("#item");

        for (var i = 0; i < data.length; i += 2) {
          _option.append(
            '<option value="' + data[i] + '">' + data[i + 1] + "</option>"
          );
        }
      }
    },
    error: function (xhr, status, error) {
      console.log(xhr.responseText);
      console.log(error);
    },
  });
}
function preencherSeletorTurnoAlt() {
  $.ajax({
    url: "./../Model/pedido/SelecionarTurno.php",
    method: "post",
    dataType: "json",

    success: function (data) {
      if (data.status != "error") {
        var _option = $("#turnoAlt");

        for (var i = 0; i < data.length; i += 2) {
          _option.append(
            '<option value="' + data[i] + '">' + data[i + 1] + "</option>"
          );
        }
      }
    },
    error: function (xhr, status, error) {
      console.log(xhr.responseText);
      console.log(error);
    },
  });
}
function preencherSeletorItemAlt() {
  $.ajax({
    url: "./../Model/pedido/SelecionarItem.php",
    method: "post",
    dataType: "json",

    success: function (data) {
      if (data.status != "error") {
        var _option = $("#itemAlt");

        for (var i = 0; i < data.length; i += 2) {
          _option.append(
            '<option value="' + data[i] + '">' + data[i + 1] + "</option>"
          );
        }
      }
    },
    error: function (xhr, status, error) {
      console.log(xhr.responseText);
      console.log(error);
    },
  });
}

//SelecionarPedido
function requisaoSelecionarPedido() {
  $.ajax({
    url: "./../Model/pedido/SelecionarPedido.php",
    method: "post",
    dataType: "json",

    success: function (data) {
      if (data.status != "error") {
        preencherTabela(data);
      }
    },
    error: function (xhr, status, error) {
      console.log(xhr.responseText);
      console.log(error);
    },
  });
}

//preencher a tabela, com botao excluir
function preencherTabela(data) {
  var tbody = $("#tableped");
  var n = 0;

  for (var i = 0; i < data.length; i += 7) {
    var tr = $("<tr>");

    n++;
    tr.append("<td>" + n + "</td>");
    tr.append("<td>" + data[i] + "</td>");
    tr.append("<td>" + data[i + 1] + "</td>");
    tr.append("<td>" + data[i + 2] + "</td>");
    tr.append("<td>" + data[i + 3] + "</td>");
    tr.append("<td>" + data[i + 4] + "</td>");
    tr.append("<td>" + data[i + 5] + "</td>");
    tr.append("<td>" + data[i + 6] + "</td>");
    tr.append(
      '<td> <button type="button" id="devolver" onclick="acaoDev(\'dev\')"><img src="../View/imagens/devolver.png" alt="Devolução" class="imgDv"></button> </td>'
    );
    tr.append(
      '<td> <button type="button" id="excluir" onclick="excluiRegistro(' +
        data[i] +
        ', this )"><img src="../View/imagens/lixeira.png" alt="Excluir" class="imgEx"></button> </td>'
    );
    tbody.append(tr);
  }
}

function excluiRegistro(codPedido, botao) {
  const rowIndex = botao.parentNode.parentNode.rowIndex;

  $.ajax({
    url: "./../Model/pedido/DeletarPedido.php",
    method: "POST",
    data: { codPedido: codPedido },
    success: function (data) {
      console.log(data.ped);
      if (data.status != "error") {
        document.getElementById("tableped").deleteRow(rowIndex);
        confirm("Tem Certeza Que Deseja Exluir Esse Pedido?");
      } else {
        alert("Erro ao excluir o registro!");
      }
    },
  });
}

// atualizar Dados do Pedido
$(document).ready(function () {
  $("#buscar").click(function () {
    var codPedido = $("#codPedidoAlt").val().trim();

    $.ajax({
      url: "./../Model/pedido/SelecionarPedidoEspecifico.php",
      data: { codPedido: codPedido },
      method: "get",
      dataType: "json",
      data: { codPedido: codPedido },
      success: function (data) {
        if (data.status != "Sem registro") {
          $("#dataAlt").val(data[1]);
          $("#turmaAlt").val(data[2]);
          $("#itemAlt").val(data[3]);
          $("#entregadorAlt").val(data[4]);
          $("#solicitanteAlt").val(data[5]);
          BuscarTurno(data[0]);
        } else {
          alert(data.comentario);
        }
      },
      error: function (xhr, status, error) {
        console.log(xhr.responseText);
        console.log(error);
      },
    });
  });
});
$(document).ready(function () {
  $("#alterar").click(function () {
    var selectItemAlt = document.getElementById("itemAlt");
    var selectEntregadorAlt = document.getElementById("entregadorAlt");
    var selectSolicitanteAlt = document.getElementById("solicitanteAlt");
    var selectTurnoAlt = document.getElementById("turnoAlt");

    var codPedidoAlt = $("#codPedidoAlt").val();
    var dataAlt = $("#dataAlt").val();
    var turmaAlt = $("#turmaAlt").val();

    var itemAlt = selectItemAlt.options[selectItemAlt.selectedIndex].value;
    var entregadorAlt =
      selectEntregadorAlt.options[selectEntregadorAlt.selectedIndex].value;
    var solicitanteAlt =
      selectSolicitanteAlt.options[selectSolicitanteAlt.selectedIndex].value;
    var turnoAlt = selectTurnoAlt.options[selectTurnoAlt.selectedIndex].value;

    console.log(turnoAlt);

    $.ajax({
      url: "./../Model/pedido/UpdatePedido.php",
      method: "post",
      dataType: "json",
      data: {
        codPedido: codPedidoAlt,
        data: dataAlt,
        turno: turnoAlt,
        item: itemAlt,
        entregador: entregadorAlt,
        solicitante: solicitanteAlt,
      },
      success: function (data) {
        console.log(data);

        $("#dataAlt").val("");
        $("#turnoAlt").val("");
        $("#turmaAlt").val("");
        $("#itemAlt").val("");
        $("#entregadorAlt").val("");
        $("#solicitanteAlt").val("");
      },
      error: function (xhr, status, error) {
        console.log(xhr.responseText);
      },
    });
  });
});

function BuscarTurno(codPedido) {
  $.ajax({
    url: "./../Model/pedido/SelecionarTurnoEspecifico.php",
    method: "post",
    dataType: "json",
    data: { codPedido: codPedido },
    success: function (data) {
      console.log(data);
      if (data.status != "error") {
        var _option = $("#turnoAlt");
        for (var i = 0; i < data.length; i += 4) {
          _option.append(
            '<option value="  ' +
              data[i] +
              '" selected>' +
              data[i + 1] +
              "</option>"
          );
        }
      }
    },
    error: function (xhr, status, error) {
      console.log(xhr.responseText);
      console.log(error);
    },
  });
}

function preencherSeletorEntregador() {
  $.ajax({
    url: "./../Model/funcionario/SelecionarFuncionarioEntregador.php",
    method: "post",
    dataType: "json",

    success: function (data) {
      if (data.status != "error") {
        var _option = $("#entregador");

        for (var i = 0; i < data.length; i += 5) {
          _option.append(
            '<option value="' + data[i] + '">' + data[i + 1] + "</option>"
          );
        }
      }
    },
    error: function (xhr, status, error) {
      console.log(xhr.responseText);
      console.log(error);
    },
  });
}

function preencherSeletorSolicitante() {
  $.ajax({
    url: "./../Model/funcionario/SelecionarFuncionario.php",
    method: "post",
    dataType: "json",

    success: function (data) {
      if (data.status != "error") {
        var _option = $("#solicitante");

        for (var i = 0; i < data.length; i += 5) {
          _option.append(
            '<option value="' + data[i] + '">' + data[i + 1] + "</option>"
          );
        }
      }
    },
    error: function (xhr, status, error) {
      console.log(xhr.responseText);
      console.log(error);
    },
  });
}

function preencherSeletorEntregadorAlt() {
  $.ajax({
    url: "./../Model/funcionario/SelecionarFuncionarioEntregador.php",
    method: "post",
    dataType: "json",

    success: function (data) {
      if (data.status != "error") {
        var _option = $("#entregadorAlt");

        for (var i = 0; i < data.length; i += 5) {
          _option.append(
            '<option value="' + data[i] + '">' + data[i + 1] + "</option>"
          );
        }
      }
    },
    error: function (xhr, status, error) {
      console.log(xhr.responseText);
      console.log(error);
    },
  });
}

function preencherSeletorSolicitanteAlt() {
  $.ajax({
    url: "./../Model/funcionario/SelecionarFuncionario.php",
    method: "post",
    dataType: "json",

    success: function (data) {
      if (data.status != "error") {
        var _option = $("#solicitanteAlt");

        for (var i = 0; i < data.length; i += 5) {
          _option.append(
            '<option value="' + data[i] + '">' + data[i + 1] + "</option>"
          );
        }
      }
    },
    error: function (xhr, status, error) {
      console.log(xhr.responseText);
      console.log(error);
    },
  });
}

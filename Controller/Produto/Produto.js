requisaoSelecionarProduto();

$(document).ready(function () {
  $("#cadastrar").click(function () {
    var selectCategoria = document.getElementById("categoria");
    var selectStatus = document.getElementById("status");

    var codPatrimonio = $("#codPatrimonio").val().trim();
    var nome = $("#nome").val().trim();
    var descricao = $("#descricao").val().trim();
    var apelido = $("#apelido").val().trim();
    var categoria =
      selectCategoria.options[selectCategoria.selectedIndex].value;
    var status = selectStatus.options[selectStatus.selectedIndex].value;

    if (
      codPatrimonio != "" &&
      nome != "" &&
      descricao != "" &&
      apelido != "" &&
      categoria != "" &&
      status != ""
    ) {
      $("#codPatrimonio").val("");
      $("#nome").val("");
      $("#descricao").val("");
      $("#apelido").val("");
      $("#categoria").val("");
      $("#status").val("");

      $.ajax({
        url: "./../Model/produto/CadastrarProduto.php",
        method: "post",
        dataType: "json",
        data: {
          codPatrimonio: codPatrimonio,
          nome: nome,
          descricao: descricao,
          apelido: apelido,
          categoria: categoria,
          status: status,
        },
        success: function (data) {
          if (data.status != "error") {
            const table = document.getElementById("tableprod");
            while (table.rows.length > 1) {
              table.deleteRow(1);
              alert("Cadastrado com Sucesso!");
            }
            requisaoSelecionarProduto();

            //fechar tela modal automatico depois de cadastrar
            fechar();
          } else {
            alert("Erro ao cadastrar");
          }
        },
        error: function (xhr, status, error) {
          console.log(xhr.responseText);
        },
      });
    } else {
      if ($("#codPatrimonio").val().trim() == "") {
        alert("Codigo Patrimonio não preenchido");
      } else if ($("#nome").val().trim() == "") {
        alert("NOME não preenchido");
      } else if ($("#descricao").val().trim() == "") {
        alert("Descrição não preenchido");
      } else if ($("#apelido").val().trim() == "") {
        alert("Apelido não preenchido");
      } else if ($("#categoria").val().trim() == "") {
        alert("Categoria não preenchido");
      } else if ($("#status").val().trim() == "") {
        alert("Status não preenchido");
      }
    }
  });
});

//PreencherSeletorModal
function preencherSeletorCategoria() {
  $.ajax({
    url: "./../Model/produto/SelecionarCategoria.php",
    method: "post",
    dataType: "json",

    success: function (data) {
      if (data.status != "error") {
        var _option = $("#categoria");
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

function preencherSeletorStatus() {
  $.ajax({
    url: "./../Model/produto/SelecionarStatus.php",
    method: "post",
    dataType: "json",

    success: function (data) {
      if (data.status != "error") {
        var _option = $("#status");
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
function preencherSeletorCategoriaAlt() {
  $.ajax({
    url: "./../Model/produto/SelecionarCategoria.php",
    method: "post",
    dataType: "json",

    success: function (data) {
      if (data.status != "error") {
        var _option = $("#categoriaAlt");
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
function preencherSeletorStatusAlt() {
  $.ajax({
    url: "./../Model/produto/SelecionarStatus.php",
    method: "post",
    dataType: "json",

    success: function (data) {
      if (data.status != "error") {
        var _option = $("#statusAlt");
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

//SelecionarProduto
function requisaoSelecionarProduto() {
  $.ajax({
    url: "./../Model/produto/SelecionarProduto.php",
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
  var tbody = $("#tableprod");
  var n = 0;

  for (var i = 0; i < data.length; i += 6) {
    var tr = $("<tr>");

    n++;
    tr.append("<td>" + n + "</td>");
    tr.append("<td>" + data[i] + "</td>");
    tr.append("<td>" + data[i + 1] + "</td>");
    tr.append("<td>" + data[i + 2] + "</td>");
    tr.append("<td>" + data[i + 3] + "</td>");
    tr.append("<td>" + data[i + 4] + "</td>");
    tr.append("<td>" + data[i + 5] + "</td>");
    tr.append(
      '<td> <button type="button" id="excluir" onclick="excluiRegistro(' +
        data[i] +
        ', this )"><img src="../View/imagens/lixeira.png" alt="Excluir" class="imgEx"></button> </td>'
    );
    tbody.append(tr);
  }
}

function excluiRegistro(codPatrimonio, botao) {
  const rowIndex = botao.parentNode.parentNode.rowIndex;

  $.ajax({
    url: "./../Model/produto/DeletarProduto.php",
    method: "POST",
    data: { codPatrimonio: codPatrimonio },
    success: function (data) {
      console.log(data.prod);
      if (data.status != "error") {
        document.getElementById("tableprod").deleteRow(rowIndex);
        confirm("Tem Certeza Que Deseja Exluir Esse Produto?");
      } else {
        alert("Erro ao excluir o registro!");
      }
    },
  });
}

//atualizar Dados do Produto
$(document).ready(function () {
  $("#buscar").click(function () {
    var codPatrimonio = $("#codPatrimonioAlt").val().trim();

    $.ajax({
      url: "./../Model/produto/SelecionarProdutoEspecifico.php",
      data: { codPatrimonio: codPatrimonio },
      method: "get",
      dataType: "json",
      success: function (data) {
        if (data.status != "Sem registro") {
          $("#nomeAlt").val(data[1]);
          $("#descricaoAlt").val(data[2]);
          $("#apelidoAlt").val(data[3]);
          BuscarCategoria(data[4]);
          BuscarStatus(data[5]);
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
    var selectStatusAlt = document.getElementById("statusAlt");
    var selectCategoriaAlt = document.getElementById("categoriaAlt");

    var codPatrimonioAlt = $("#codPatrimonioAlt").val();
    var nomeAlt = $("#nomeAlt").val();
    var descricaoAlt = $("#descricaoAlt").val();
    var apelidoAlt = $("#apelidoAlt").val();

    var categoriaAlt =
      selectCategoriaAlt.options[selectCategoriaAlt.selectedIndex].value;
    var statusAlt =
      selectStatusAlt.options[selectStatusAlt.selectedIndex].value;

    console.log(categoriaAlt);
    $.ajax({
      url: "./../Model/produto/UpdateProduto.php",
      method: "post",
      dataType: "json",
      data: {
        codPatrimonio: codPatrimonioAlt,
        nome: nomeAlt,
        descricao: descricaoAlt,
        apelido: apelidoAlt,
        categoria: categoriaAlt,
        status: statusAlt,
      },
      success: function (data) {
        console.log(data);
        $("#nomeAlt").val("");
        $("#descricaoAlt").val("");
        $("#apelidoAlt").val("");
        $("#categoriaAlt").val("");
        $("#statusAlt").val("");
      },
      error: function (xhr, status, error) {
        console.log(xhr.responseText);
      },
    });
  });
});

function BuscarCategoria(codPatrimonio) {
  $.ajax({
    url: "./../Model/produto/SelecionarCategoriaEspecifico.php",
    method: "post",
    dataType: "json",
    data: { codPatrimonio: codPatrimonio },
    success: function (data) {
      console.log(data);
      if (data.status != "error") {
        var _option = $("#categoriaAlt");
        for (var i = 0; i < data.length; i += 2) {
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
function BuscarStatus(codPatrimonio) {
  $.ajax({
    url: "./../Model/produto/SelecionarStatusEspecifico.php",
    method: "post",
    dataType: "json",
    data: { codPatrimonio: codPatrimonio },
    success: function (data) {
      console.log(data);
      if (data.status != "error") {
        var _option = $("#statusAlt");
        for (var i = 0; i < data.length; i += 2) {
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

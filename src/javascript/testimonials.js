<button class="btn-default" onclick="document.getElementById('mais-avaliacoes').style.display='block'">
  Ver mais avaliações
</button>

function recolherAvaliacoes() {
  // Faça a transição suave para recolher as avaliações
  document.getElementById('avaliacoes').style.transition = 'height 0.5s ease';
  document.getElementById('avaliacoes').style.height = '0';

  // Redirecione o usuário de volta para a seção de avaliações
  document.getElementById('avaliacoes').scrollIntoView({ behavior: 'smooth' });
}
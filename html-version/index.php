<?php
/**
 * PSP Contabilidade - Versão PHP
 * Este arquivo serve como entry point para hospedagem PHP.
 * Ele simplesmente inclui o index.html estático.
 * Você pode adicionar lógica PHP aqui conforme necessário
 * (formulários, autenticação, conexão com banco, etc.)
 */

// Configurações de exemplo
$site_name = "PSP Contabilidade - Tributarium";
$current_year = date('Y');

// Inclui o HTML estático
include('index.html');
?>
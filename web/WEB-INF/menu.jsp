<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand mx-3" id="book_shop">Магазин книг</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
            <c:choose>
                <c:when test="${topRole eq 'ADMINISTRATOR'}">
                   <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                       <li class="nav-item"> <a class='nav-link' aria-current="page">Панель Администратора</a></li>
                   </ul>
                </c:when>
                <c:when test="${topRole eq 'MANAGER'}">
                   <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                   </ul>
                </c:when>
                <c:when test="${topRole eq 'CUSTOMER'}">
                   <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                   </ul>
                </c:when> 
            </c:choose>
      <ul class="navbar-nav mx-3 mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link" href="showLogin" id="menu_login">Войти</a>
        </li>
        <li class="nav-item d-none"><a class="nav-link d-none" href="logout" id="menu_logout">Выйти</a></li>
        <li class="nav-item d-none"><a class="nav-link d-none" href="logout" id="menu_profile">Профиль</a></li>
        <li class="nav-item d-none"> <a class='nav-link' aria-current="page" id="menu_purchases">Покупки</a></li>
        <li class="nav-item d-none"> <a class='nav-link' aria-current="page" id="menu_add_book">Добавить книгу</a></li>
        <li class="nav-item d-none"> <a class='nav-link' aria-current="page" id="menu_add_author">Добавить автора</a></li>
      </ul>
  </nav>

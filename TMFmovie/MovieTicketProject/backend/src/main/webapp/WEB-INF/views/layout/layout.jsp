<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<!DOCTYPE html>
<html>
<head>
<style>
.card {
    transition: all 0.3s ease;
}
.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 20px rgba(0,0,0,0.15);
}
</style>
</head>
<body>
<jsp:include page="/WEB-INF/views/layout/header.jsp" />

<jsp:include page="/WEB-INF/views/layout/navbar.jsp" />

<div class="container container-main">
    <!-- CONTENT BLOCK -->
    <jsp:include page="${contentPage}" />
</div>

<jsp:include page="/WEB-INF/views/layout/footer.jsp" />
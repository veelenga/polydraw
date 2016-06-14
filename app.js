$(document).ready(function() {
  var drawSample = function(sample) {
    $.getJSON('data/' + sample + '.json', function(data){
      for (var i = 0; i < data.polygons.length; i ++){
        drawPolygon(data.polygons[i]);
      }
    });
  }

  var drawPolygon = function(polygon) {
    ctx.beginPath();
    drawEdges(polygon.vertices);
    ctx.closePath();

    if (polygon.inner !== undefined) {
      for (var i = 0; i < polygon.inner.length; i ++) {
        initial = polygon.inner[i].vertices[0]
        ctx.moveTo(initial.x, initial.y);
        drawEdges(polygon.inner[i].vertices);
        ctx.closePath();
      }
    }

    ctx.globalAlpha = 0.6;
    ctx.fillStyle = 'yellow';
    ctx.fill();
    ctx.stroke();
  }

  var drawEdges = function(vertices) {
    for (var i = 0; i < vertices.length; i ++) {
      ctx.lineTo(vertices[i].x, vertices[i].y);
    }
  }

  var sampleSelected = function() {
    return $('#samples').children(':selected').attr('value');
  }

  var redraw = function() {
    ctx.clearRect(0, 0, c.width, c.height);
    drawSample(sampleSelected());
  }

  $('#draw').click(function() {
    redraw();
  });

  $('#download').click(function() {
    top.location.href = 'data/' + sampleSelected() + '.json'
  })

  var c = document.getElementById('logoCanvas');
  var ctx = c.getContext('2d');
  redraw();
});

